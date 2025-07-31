
import { ChangeEvent, Fragment, useState, useEffect } from "react";
import API from "@/lib/api";
import { Button, AButton } from "@/components/button";
import { Textarea } from "@/components/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Badge } from "@/components/badge";
import { Input } from "@/components/input";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { Image, Video, Wand2, Download, Heart, Share2, Sparkles, Coins } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

type AIImage = {
  id: string;
  prompt: string;
  url: string;
}

const AIGeneration = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [ratio, setRatio] = useState("1024x1024");
  const [image, setImage] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<AIImage[]>([]);
  const [activeTab, setActiveTab] = useState("image");
  const [current, setCurrent] = useState(0);
  const [limit, setLimit] = useState(0);

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage && selectedImage.type.startsWith('image/')) {
      setImage(selectedImage);
    } else {
      setImage(null);
    }
  }

  const handleGenerate = async () => {
    if (current <= 0) return toast.error("Image generation limited for today.");

    if (!prompt.trim()) return toast.error("Please enter a prompt to generate content");

    if (!user) return toast.error("Please login to generate", {
      action: <span onClick={() => navigate('/auth')} className="cursor-pointer text-primary">Login</span>
    });

    setIsGenerating(true);

    if (image) {
      const formData = new FormData();
      formData.append('prompt', prompt);
      formData.append('image', image);

      API.post('/image/edit', formData).then(res => {
        setGeneratedImages(res.data.images);
        toast.success("AI content generated successfully! ✨");
      }).catch(err => {
        toast.error("AI content generation failed.");
      }).finally(() => {
        setIsGenerating(false);
        fetchBalance();
      });
    } else {
      API.post('/image/generate', { prompt, ratio }).then((res) => {
        setGeneratedImages(res.data.images);
        toast.success("AI content generated successfully! ✨");
      }).catch((err) => {
        toast.error("AI content generation failed.");
      }).finally(() => {
        setIsGenerating(false);
        fetchBalance();
      });
    }
  };

  const shareImage = (id: string) => {
    API.post('/image/publish', { id, isPublic: true }).then(_res => {
      toast.success("Image is published successfully.");
    }).catch((err) => {
      toast.error("Image publish failed.");
    });
  };

  const fetchBalance = () => {
    API.get('/image/status').then(res => {
      setCurrent(res.data.current);
      setLimit(res.data.limit);
    }).catch(console.error);
  }

  useEffect(fetchBalance, []);

  return (
    <Fragment>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Badge className="bg-gradient-to-r from-tonix-blue to-tonix-cyan text-white px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Creation Studio
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-space font-bold mb-6">
              Create <span className="gradient-text">Stunning Visuals</span> with AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your ideas into beautiful images and videos using cutting-edge AI technology.
              Earn points, create content, and mint NFTs on the TON blockchain.
            </p>
          </div>

          {/* Points Display */}
          <div className="flex justify-center items-center gap-4 mb-8">
            {user && <div className="flex justify-center">
              <Card className="bg-gradient-to-r from-tonix-blue/10 to-tonix-cyan/10 border-tonix-blue/20">
                <CardContent className="flex items-center space-x-4 py-4 px-6">
                  <Coins className="w-6 h-6 text-tonix-blue" />
                  <div>
                    <div className="text-2xl font-bold text-tonix-blue">{current}/{limit}</div>
                    <div className="text-sm text-muted-foreground">Free Points</div>
                  </div>
                  <Badge variant="outline" className="border-tonix-cyan text-tonix-cyan">
                    Earn 4 Everyday
                  </Badge>
                </CardContent>
              </Card>
            </div>}
            {user && <div className="flex justify-center">
              <Card className="bg-gradient-to-r from-tonix-blue/10 to-tonix-cyan/10 border-tonix-blue/20">
                <CardContent className="flex items-center space-x-4 py-4 px-6">
                  <Coins className="w-6 h-6 text-tonix-blue" />
                  <div>
                    <div className="text-2xl font-bold text-tonix-blue">{user.coin.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Available Points</div>
                  </div>
                  <Badge variant="outline" className="border-tonix-cyan text-tonix-cyan">
                    Earn more in Telegram
                  </Badge>
                </CardContent>
              </Card>
            </div>}
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
                  {/* <Tabs value={activeTab}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="image" className="flex items-center">
                        <Image className="w-4 h-4 mr-2" />
                        Image
                      </TabsTrigger>
                      <TabsTrigger value="video" className="flex items-center" onClick={() => toast.info('Video generation feature is coming soon.')}>
                        <Video className="w-4 h-4 mr-2" />
                        Video
                      </TabsTrigger>
                    </TabsList> */}

                  <div className="space-y-4 mt-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Prompt *</label>
                      <Textarea
                        placeholder="Describe what you want to create... (e.g., 'A futuristic city with flying cars at sunset')"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="resize-none"
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Image reference (Optional)</label>
                      <Input type="file" onChange={handleChangeImage} accept="image/png" />
                    </div>

                    {/* <TabsContent value="image" className="space-y-4 mt-0"> */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Style</label>
                      <Select defaultValue="photorealistic">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-border">
                          <SelectItem value="photorealistic">Photorealistic</SelectItem>
                          <SelectItem value="artistic">Artistic</SelectItem>
                          <SelectItem value="anime">Anime</SelectItem>
                          <SelectItem value="cartoon">Cartoon</SelectItem>
                          <SelectItem value="oil-painting">Oil Painting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Aspect Ratio</label>
                      <Select value={ratio} onValueChange={setRatio}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-border">
                          <SelectItem value="1024x1024">Square (1:1)</SelectItem>
                          <SelectItem value="1536x1024">Landscape (16:9)</SelectItem>
                          <SelectItem value="1024x1536">Portrait (9:16)</SelectItem>
                          <SelectItem value="auto">Classic (4:3)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {/* </TabsContent> */}

                    {/* <TabsContent value="video" className="space-y-4 mt-0">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Duration</label>
                          <Select defaultValue="3s">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-background border border-border">
                              <SelectItem value="3s">3 seconds</SelectItem>
                              <SelectItem value="5s">5 seconds</SelectItem>
                              <SelectItem value="10s">10 seconds</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Motion</label>
                          <Select defaultValue="medium">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-background border border-border">
                              <SelectItem value="low">Low Motion</SelectItem>
                              <SelectItem value="medium">Medium Motion</SelectItem>
                              <SelectItem value="high">High Motion</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TabsContent> */}

                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Cost</span>
                        <span className="text-sm text-tonix-blue font-semibold">
                          {activeTab === "image" ? "50 points" : "200 points"}
                        </span>
                      </div>
                      <Button
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt.trim()}
                        className="w-full bg-gradient-to-r from-tonix-blue to-tonix-cyan hover:from-tonix-cyan hover:to-tonix-blue text-white"
                      >
                        {isGenerating ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Generating...
                          </>
                        ) : (
                          <>
                            <Wand2 className="w-4 h-4 mr-2" />
                            Generate {activeTab === "image" ? "Image" : "Video"}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  {/* </Tabs> */}
                </CardContent>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Generated Content</CardTitle>
                </CardHeader>
                <CardContent>
                  {generatedImages.length === 0 && !isGenerating ? (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 bg-gradient-to-r from-tonix-blue/20 to-tonix-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-12 h-12 text-tonix-blue" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Ready to Create</h3>
                      <p className="text-muted-foreground">
                        Enter a prompt and click generate to create amazing AI content
                      </p>
                    </div>
                  ) : isGenerating ? (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 bg-gradient-to-r from-tonix-blue/20 to-tonix-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Wand2 className="w-12 h-12 text-tonix-blue animate-spin" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">AI is Working Magic</h3>
                      <p className="text-muted-foreground">
                        Creating your {activeTab} with advanced AI models...
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                      {generatedImages.map((image, index) => (
                        <Card key={index} className="group overflow-hidden">
                          <div className="relative">
                            <img
                              src={image.url}
                              alt={`Generated content ${index + 1}`}
                              className="w-full object-cover transition-transform"
                            />
                          </div>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <Badge variant="outline" className="mb-2">
                                  {image.prompt.substring(0, 25)}...
                                </Badge>
                                <p className="text-sm text-muted-foreground">
                                  Generated {new Date().toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex space-x-2">
                                <AButton size="sm" variant="outline" href={image.url} download>
                                  <Download className="w-4 h-4" />
                                </AButton>
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white"
                                  onClick={() => shareImage(image.id)}
                                >
                                  <Share2 className="w-4 h-4" /> Publish
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
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

export default AIGeneration;
