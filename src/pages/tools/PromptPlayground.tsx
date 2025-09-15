import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sliders, 
  Play, 
  Copy, 
  Shuffle, 
  BookOpen,
  Zap,
  GitCompare
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PromptPlayground = () => {
  const { toast } = useToast();
  const [creativity, setCreativity] = useState([50]);
  const [tone, setTone] = useState('neutral');
  const [style, setStyle] = useState('professional');
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'formal', label: 'Formal' },
    { value: 'humorous', label: 'Humorous' },
    { value: 'persuasive', label: 'Persuasive' }
  ];

  const styles = [
    { value: 'professional', label: 'Professional' },
    { value: 'creative', label: 'Creative' },
    { value: 'technical', label: 'Technical' },
    { value: 'storytelling', label: 'Storytelling' },
    { value: 'academic', label: 'Academic' },
    { value: 'marketing', label: 'Marketing' }
  ];

  const promptLibrary = [
    { category: 'Writing', prompts: [
      'Write a compelling blog post about...',
      'Create an engaging social media caption for...',
      'Draft a professional email to...'
    ]},
    { category: 'Creative', prompts: [
      'Generate creative ideas for...',
      'Write a short story about...',
      'Create a catchy slogan for...'
    ]},
    { category: 'Business', prompts: [
      'Analyze the market potential of...',
      'Create a business plan outline for...',
      'Write a product description for...'
    ]}
  ];

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      toast({
        title: "Enter a prompt",
        description: "Please enter a prompt to generate results",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const sampleResults = [
        `Result A (Creativity: ${creativity[0]}, Tone: ${tone}, Style: ${style})\n\nThis is a sample generated response based on your prompt: "${prompt}". The creativity level affects how unconventional the response is, while tone and style shape the overall approach and presentation.`,
        `Result B (Alternative approach)\n\nHere's an alternative perspective on: "${prompt}". This version explores different angles while maintaining the selected tone and style preferences you've configured.`
      ];
      
      setResults(sampleResults);
      setIsGenerating(false);
      
      toast({
        title: "Results generated",
        description: "Your prompt has been processed successfully"
      });
    }, 2000);
  }, [prompt, creativity, tone, style, toast]);

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Result copied successfully"
    });
  }, [toast]);

  const handleShuffle = useCallback(() => {
    setCreativity([Math.floor(Math.random() * 100)]);
    setTone(tones[Math.floor(Math.random() * tones.length)].value);
    setStyle(styles[Math.floor(Math.random() * styles.length)].value);
    
    toast({
      title: "Settings randomized",
      description: "Try generating with these new settings"
    });
  }, []);

  const loadPrompt = useCallback((promptText: string) => {
    setPrompt(promptText);
    toast({
      title: "Prompt loaded",
      description: "Ready to generate with library prompt"
    });
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Sliders className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">PromptPlayground</h1>
              <p className="text-muted-foreground">Visual controls for creativity, tone, and style</p>
            </div>
            <Badge variant="secondary" className="ml-auto">Free</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sliders className="h-5 w-5" />
                Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Creativity Slider */}
              <div className="space-y-2">
                <Label>Creativity Level: {creativity[0]}%</Label>
                <Slider
                  value={creativity}
                  onValueChange={setCreativity}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Conservative</span>
                  <span>Experimental</span>
                </div>
              </div>

              {/* Tone Selection */}
              <div className="space-y-2">
                <Label>Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Style Selection */}
              <div className="space-y-2">
                <Label>Style</Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    {styles.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button onClick={handleShuffle} variant="outline" className="w-full">
                  <Shuffle className="h-4 w-4 mr-2" />
                  Randomize Settings
                </Button>
                <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  {isGenerating ? "Generating..." : "Generate"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Prompt & Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="prompt" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="prompt">Your Prompt</TabsTrigger>
                  <TabsTrigger value="library">Prompt Library</TabsTrigger>
                </TabsList>
                
                <TabsContent value="prompt" className="space-y-4">
                  <div>
                    <Label htmlFor="prompt">Enter your prompt</Label>
                    <Textarea
                      id="prompt"
                      placeholder="Describe what you want to generate..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[120px] mt-2"
                    />
                  </div>

                  {/* Side-by-side Results */}
                  {results.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <GitCompare className="h-5 w-5" />
                        <h3 className="font-medium">Generated Results</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {results.map((result, index) => (
                          <div key={index} className="border rounded-lg p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <Badge variant="outline">Result {String.fromCharCode(65 + index)}</Badge>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleCopy(result)}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="text-sm whitespace-pre-wrap">{result}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="library" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      <h3 className="font-medium">Built-in Prompt Library</h3>
                    </div>
                    
                    {promptLibrary.map((category, categoryIndex) => (
                      <div key={categoryIndex} className="space-y-2">
                        <h4 className="font-medium text-sm">{category.category}</h4>
                        <div className="space-y-1">
                          {category.prompts.map((promptText, promptIndex) => (
                            <button
                              key={promptIndex}
                              onClick={() => loadPrompt(promptText)}
                              className="w-full text-left p-3 text-sm border rounded-lg hover:border-primary/50 transition-colors"
                            >
                              {promptText}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PromptPlayground;