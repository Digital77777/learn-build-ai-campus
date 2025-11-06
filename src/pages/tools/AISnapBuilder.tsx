import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Blocks, 
  Upload, 
  Play, 
  Download, 
  Eye, 
  Settings,
  Image as ImageIcon,
  FileText,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const AISnapBuilder = () => {
  const { toast } = useToast();
  const [projectName, setProjectName] = useState('');
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previewResult, setPreviewResult] = useState<string | null>(null);

  const aiBlocks = [
    { id: 'classifier', name: 'Image Classifier', icon: ImageIcon, description: 'Classify images into categories' },
    { id: 'detector', name: 'Object Detector', icon: Eye, description: 'Detect objects in images' },
    { id: 'text', name: 'Text Analyzer', icon: FileText, description: 'Analyze text sentiment & topics' },
    { id: 'predictor', name: 'Data Predictor', icon: BarChart3, description: 'Predict values from data' }
  ];

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setUploadedFiles(prev => [...prev, ...Array.from(files)]);
      toast({
        title: "Files uploaded",
        description: `${files.length} training examples added`,
      });
    }
  }, [toast]);

  const handleTraining = useCallback(async () => {
    if (!selectedBlock || uploadedFiles.length < 5) {
      toast({
        title: "Setup incomplete",
        description: "Select a block and upload at least 5 examples",
        variant: "destructive"
      });
      return;
    }

    setIsTraining(true);
    setProgress(0);

    // Simulate training progress - for the sake of the demo, we'll still use a timer
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          toast({
            title: "Model trained successfully!",
            description: "Your AI model is ready to use"
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  }, [selectedBlock, uploadedFiles.length, toast]);

  const handlePreview = async () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No file selected",
        description: "Please upload an image to preview",
        variant: "destructive"
      });
      return;
    }

    const file = uploadedFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;

      const { data, error } = await supabase.functions.invoke('imagga-proxy', {
        body: { image: base64Image }
      });

      if (error) {
        toast({
          title: "Error analyzing image",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      setPreviewResult(data.result.tags[0].tag.en);
      toast({
        title: "Preview generated",
        description: "The analysis of your image is complete"
      });
    };
  };

  const handleExport = () => {
    toast({
      title: "Model exported",
      description: "Your AI model has been saved"
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
              <Blocks className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI SnapBuilder</h1>
              <p className="text-muted-foreground">Drag-and-drop AI blocks with visual training</p>
            </div>
            <Badge variant="secondary" className="ml-auto">Free</Badge>
          </div>
          
          <div className="flex gap-3 items-center">
            <Input
              placeholder="Project name..."
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="max-w-xs"
            />
            <Button variant="outline" onClick={handlePreview} disabled={!selectedBlock} size="sm">
              <Eye className="h-4 w-4" />
            </Button>
            <Button onClick={handleExport} disabled={progress < 100} size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Blocks Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Blocks className="h-5 w-5" />
                AI Blocks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiBlocks.map((block) => (
                <div
                  key={block.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedBlock === block.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedBlock(block.id)}
                >
                  <div className="flex items-start gap-3">
                    <block.icon className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">{block.name}</h3>
                      <p className="text-sm text-muted-foreground">{block.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Training Panel */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Training Setup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload Examples</TabsTrigger>
                  <TabsTrigger value="train">Train Model</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload" className="space-y-4">
                  <div>
                    <Label htmlFor="file-upload" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Training Data
                    </Label>
                    <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground mb-3">
                        5-10 examples minimum
                      </p>
                      <Input
                        id="file-upload"
                        type="file"
                        multiple
                        accept="image/*,.txt,.csv"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Label htmlFor="file-upload">
                        <Button variant="outline" size="sm" asChild>
                          <span>
                            <Upload className="h-4 w-4 mr-2" />
                            Choose Files
                          </span>
                        </Button>
                      </Label>
                    </div>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Uploaded Files ({uploadedFiles.length})</h4>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            {file}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="train" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Model Training</h4>
                      <Badge variant={progress === 100 ? "default" : isTraining ? "secondary" : "outline"}>
                        {progress === 100 ? "Complete" : isTraining ? "Training..." : "Ready"}
                      </Badge>
                    </div>
                    
                    {(isTraining || progress > 0) && (
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="w-full" />
                      </div>
                    )}

                    <Button 
                      onClick={handleTraining} 
                      disabled={isTraining || !selectedBlock || uploadedFiles.length < 5}
                      className="w-full"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {isTraining ? "Training..." : "Train"}
                    </Button>

                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>✓ Selected Block: {selectedBlock ? aiBlocks.find(b => b.id === selectedBlock)?.name : "None"}</p>
                      <p>✓ Training Examples: {uploadedFiles.length}/5 minimum</p>
                      <p>✓ Estimated Time: 2-3 minutes</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Live Preview Window */}
        {selectedBlock && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <Play className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    {previewResult ? previewResult : progress === 100 ? "Model ready for testing" : "Train your model to see live preview"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AISnapBuilder;