import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/card";
import { Input } from "@/components/input";
import API from "@/lib/api";
import { Image as ImageIcon, Sparkles, TrashIcon, Eye, EyeClosed } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoaderCircle } from "lucide-react";
import { Badge } from "@/components/badge";
import { Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/dialog";
import { Button } from "@/components/button";
import { toast } from "sonner";

type Image = {
  id: string;
  url: string;
  prompt: string;
  avatar: string;
  firstName: string;
  lastName: string;
  isPublic: boolean;
}

const MyImages = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchImages = () => {
    const pageSize = 12;
    API.get(`/image/mine?page=${page}&pageSize=${pageSize}`).then(res => {
      setImages(prev => [...prev, ...res.data]);
      setPage(prev => prev + 1);
      if (res.data.length < pageSize) setHasMore(false);
    }).catch(console.error);
  }

  const changeVisibility = (id: string, visible: boolean) => {
    API.post('/image/publish', { id, isPublic: visible }).then(res => {
      if (visible) toast.success('Image is public now');
      else toast.success('Image is private now');
      setImages(prev => prev.map(image => {
        if (image.id === id) return ({
          ...image,
          isPublic: visible
        });
        else return image;
      }));
    }).catch(err => {
      toast.error(err.message);
    });
  }

  const deleteImage = (id: string) => {
    API.post('/image/delete', { id }).then(() => {
      toast.success('Deleted successfully');
      setImages([]);
      setPage(0);
      setHasMore(true);
    }).catch(err => {
      toast.error(err.message);
    });
  }

  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            AI Gallery
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See What's Possible with{" "}
            <span className="gradient-text">TONIXAI</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore stunning AI-generated images and videos created by our community.
            Get inspired and create your own masterpieces.
          </p>
        </div>
        <div className="mb-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-2">
            <h3 className="text-2xl md:text-3xl font-bold flex items-center">
              <ImageIcon className="w-8 h-8 mr-3 text-primary" />
              My Images
            </h3>
            <Input className="max-w-40" placeholder="Search..." />
          </div>

          <InfiniteScroll
            dataLength={images.length}
            next={fetchImages}
            hasMore={hasMore}
            loader={<div className="py-2 flex justify-center items-center md:col-span-2 lg:col-span-4"><LoaderCircle className="animate-spin" /></div>}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <div className="overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.prompt}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-2 right-2 items-center gap-2 flex">
                    {image.isPublic ?
                      <Eye onClick={() => changeVisibility(image.id, false)} color="yellow" className="cursor-pointer" /> :
                      <EyeClosed onClick={() => changeVisibility(image.id, true)} color="yellow" className="cursor-pointer" />
                    }
                    <Dialog>
                      <DialogTrigger>
                        <TrashIcon color="red" className="cursor-pointer" />
                      </DialogTrigger>
                      <DialogPortal>
                        <DialogOverlay />
                        <DialogContent>
                          <DialogTitle>Delete Item</DialogTitle>
                          <DialogDescription>Are you sure want to delete?</DialogDescription>
                          <DialogClose asChild>
                            <Button variant="destructive" onClick={() => deleteImage(image.id)}>Delete</Button>
                          </DialogClose>
                        </DialogContent>
                      </DialogPortal>
                    </Dialog>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    "{image.prompt}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </section>
  )
}

export default MyImages;