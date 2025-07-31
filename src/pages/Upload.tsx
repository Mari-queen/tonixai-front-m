
import { useState, Fragment, ChangeEvent } from "react";
import API from "@/lib/api";
import { Button, AButton } from "@/components/button";
import { Textarea } from "@/components/textarea";
import { Input } from "@/components/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Badge } from "@/components/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Image, Video, Wand2, Download, Heart, Share2, UploadIcon, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("image");

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage && selectedImage.type.startsWith('image/')) {
      setImage(selectedImage);
      setPreviewImageUrl(URL.createObjectURL(selectedImage));
    } else {
      setImage(null);
      setPreviewImageUrl(null);
    }
  }

  const handleUpload = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to upload content");
      return;
    }

    if (!image) {
      toast.error("Please select file to upload");
      return;
    }

    if (!user) {
      toast.error("Please login to generate", {
        action: <span onClick={() => navigate('/auth')} className="cursor-pointer text-primary">Login</span>
      });
      return;
    }

    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('image', image);

    setIsUploading(true);

    API.post('/image/upload', formData).then(res => {
      toast.success('Content is uploaded successfully');
    }).catch(err => {
      toast.error('Upload failed');
    }).finally(() => {
      setIsUploading(false);
    });
  }

  return (
    <Fragment>

      <section className="pt-24 pb-16 bg-gradient-to-br from-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Badge className="bg-gradient-to-r from-tonix-blue to-tonix-cyan text-white px-4 py-2">
                <UploadIcon className="w-4 h-4 mr-2" />
                Upload Image
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-space font-bold mb-6">
              Upload your <span className="gradient-text">Stunning Visuals</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your ideas into beautiful images and videos using cutting-edge AI technology.
              Earn points, create content, and mint NFTs on the TON blockchain.
            </p>
          </div>
        </div>
      </section>

      {/* Generation Interface */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Controls Panel */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wand2 className="w-5 h-5 mr-2 text-tonix-blue" />
                    Creation Studio
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Tabs value={activeTab}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="image" className="flex items-center">
                        <Image className="w-4 h-4 mr-2" />
                        Image
                      </TabsTrigger>
                      <TabsTrigger value="video" className="flex items-center" onClick={() => toast.info('Video generation feature is coming soon.')}>
                        <Video className="w-4 h-4 mr-2" />
                        Video
                      </TabsTrigger>
                    </TabsList>

                    <div className="space-y-4 mt-6">
                      <TabsContent value="image" className="space-y-4 mt-0">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Style</label>
                          <Input type="file" onChange={handleChangeImage} accept="image/*" />
                        </div>
                      </TabsContent>

                      <TabsContent value="video" className="space-y-4 mt-0">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Style</label>
                          <Input type="file" accept="video/*" />
                        </div>
                      </TabsContent>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Prompt</label>
                        <Textarea
                          placeholder="Describe what you want to create... (e.g., 'A futuristic city with flying cars at sunset')"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          className="resize-none"
                          rows={4}
                        />
                      </div>

                      <div className="pt-4 border-t border-border">
                        <Button
                          disabled={isUploading || !prompt.trim()}
                          className="w-full bg-gradient-to-r from-tonix-blue to-tonix-cyan hover:from-tonix-cyan hover:to-tonix-blue text-white"
                          onClick={handleUpload}
                        >
                          {isUploading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Uploading...
                            </>
                          ) : (
                            <>
                              <UploadIcon className="w-4 h-4 mr-2" />
                              Upload {activeTab === "image" ? "Image" : "Video"}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Uploaded Content</CardTitle>
                </CardHeader>
                <CardContent>
                  {!previewImageUrl && !isUploading ? (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 bg-gradient-to-r from-tonix-blue/20 to-tonix-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UploadIcon className="w-12 h-12 text-tonix-blue" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Ready to Upload</h3>
                      <p className="text-muted-foreground">
                        Enter a prompt and click here to upload amazing AI content
                      </p>
                    </div>
                  ) : isUploading ? (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 bg-gradient-to-r from-tonix-blue/20 to-tonix-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <LoaderCircle className="w-12 h-12 text-tonix-blue animate-spin" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Uploading content</h3>
                      <p className="text-muted-foreground">
                        Uploading your {activeTab} to server...
                      </p>
                    </div>
                  ) : (
                    <div className="">
                      <img src={previewImageUrl} className="w-full" alt="" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Upload;
