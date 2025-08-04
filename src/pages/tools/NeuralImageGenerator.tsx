import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image, Wand2, Download, Share, Settings, Palette, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const NeuralImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [quality, setQuality] = useState([75]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const styles = [
    { value: 'realistic', label: 'Realistic', description: 'Photorealistic images' },
    { value: 'artistic', label: 'Artistic', description: 'Painterly and creative' },
    { value: 'anime', label: 'Anime', description: 'Japanese animation style' },
    { value: 'digital', label: 'Digital Art', description: 'Modern digital artwork' },
    { value: 'vintage', label: 'Vintage', description: 'Retro and classic styles' }
  ];

  const samplePrompts = [
    "A futuristic cityscape at sunset with flying cars",
    "A magical forest with glowing mushrooms and fairy lights",
    "A steampunk robot reading a book in a library",
    "An astronaut floating in space with Earth in the background"
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt to generate an image');
      return;
    }

    setIsGenerating(true);
    
    // Simulate image generation
    setTimeout(() => {
      const mockImages = [
        'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
        'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
        'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
        'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg'
      ];
      setGeneratedImages(mockImages);
      setIsGenerating(false);
      toast.success('Images generated successfully!');
    }, 3000);
  };

  const downloadImage = (imageUrl: string) => {
    toast.success('Image download started!');
  };

  const shareImage = (imageUrl: string) => {
    navigator.clipboard.writeText(imageUrl);
    toast.success('Image URL copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Image className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Neural Image Generator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create stunning visuals and artwork using state-of-the-art image generation AI
          </p>
          <Badge className="mt-4 bg-purple-100 text-purple-800">50 images/day</Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  Generation Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Prompt</label>
                  <Textarea
                    placeholder="Describe the image you want to create..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Style</label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {styles.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          <div>
                            <div className="font-medium">{s.label}</div>
                            <div className="text-xs text-muted-foreground">{s.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Quality: {quality[0]}%
                  </label>
                  <Slider
                    value={quality}
                    onValueChange={setQuality}
                    max={100}
                    min={25}
                    step={25}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Fast</span>
                    <span>Balanced</span>
                    <span>High Quality</span>
                  </div>
                </div>

                <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Images
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Sample Prompts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sample Prompts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {samplePrompts.map((samplePrompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start h-auto p-3"
                    onClick={() => setPrompt(samplePrompt)}
                  >
                    <div className="text-xs">{samplePrompt}</div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Generated Images */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Generated Images
                </CardTitle>
              </CardHeader>
              <CardContent>
                {generatedImages.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {generatedImages.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={imageUrl}
                          alt={`Generated image ${index + 1}`}
                          className="w-full aspect-square object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                          <Button size="sm" onClick={() => downloadImage(imageUrl)}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => shareImage(imageUrl)}>
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Image className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">No images generated yet</p>
                    <p className="text-sm">Enter a prompt and click "Generate Images" to create stunning AI artwork</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Wand2 className="h-8 w-8 mx-auto mb-3 text-purple-500" />
              <h3 className="font-semibold mb-2">Text-to-Image</h3>
              <p className="text-sm text-muted-foreground">
                Transform text descriptions into stunning visual artwork
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Palette className="h-8 w-8 mx-auto mb-3 text-pink-500" />
              <h3 className="font-semibold mb-2">Style Transfer</h3>
              <p className="text-sm text-muted-foreground">
                Apply different artistic styles to your generated images
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Settings className="h-8 w-8 mx-auto mb-3 text-blue-500" />
              <h3 className="font-semibold mb-2">Advanced Controls</h3>
              <p className="text-sm text-muted-foreground">
                Fine-tune generation parameters for perfect results
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NeuralImageGenerator;