import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Brain, FlaskRound as Flask, Database, Users, Play, Pause, Download, Share } from 'lucide-react';
import { toast } from 'sonner';

const AIResearchLab = () => {
  const [experimentName, setExperimentName] = useState('');
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('experiments');

  const experiments = [
    {
      id: '1',
      name: 'Sentiment Analysis Model',
      status: 'completed',
      accuracy: 94.2,
      duration: '2h 15m',
      dataset: 'Twitter Sentiment Dataset'
    },
    {
      id: '2',
      name: 'Image Classification CNN',
      status: 'training',
      accuracy: 87.5,
      duration: '45m',
      dataset: 'CIFAR-10'
    },
    {
      id: '3',
      name: 'Language Translation Model',
      status: 'pending',
      accuracy: 0,
      duration: '0m',
      dataset: 'Multi30K'
    }
  ];

  const models = [
    {
      name: 'GPT-4 Fine-tuned',
      type: 'Language Model',
      parameters: '175B',
      performance: 'Excellent'
    },
    {
      name: 'ResNet-50 Custom',
      type: 'Vision Model',
      parameters: '25M',
      performance: 'Good'
    },
    {
      name: 'BERT Specialized',
      type: 'NLP Model',
      parameters: '110M',
      performance: 'Very Good'
    }
  ];

  const datasets = [
    {
      name: 'Custom Text Corpus',
      size: '2.5GB',
      samples: '1.2M',
      type: 'Text'
    },
    {
      name: 'Image Classification Set',
      size: '15GB',
      samples: '500K',
      type: 'Images'
    },
    {
      name: 'Audio Transcription Data',
      size: '8GB',
      samples: '300K',
      type: 'Audio'
    }
  ];

  const startTraining = () => {
    if (!experimentName.trim()) {
      toast.error('Please enter an experiment name');
      return;
    }

    setIsTraining(true);
    setTrainingProgress(0);

    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          toast.success('Training completed successfully!');
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const stopTraining = () => {
    setIsTraining(false);
    setTrainingProgress(0);
    toast.info('Training stopped');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'training':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">AI Research Lab</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experiment with cutting-edge AI models and research tools
          </p>
          <Badge className="mt-4 bg-indigo-100 text-indigo-800">Academic Plan</Badge>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center gap-4 mb-8">
          <Button variant="outline">
            <Flask className="h-4 w-4 mr-2" />
            New Experiment
          </Button>
          <Button variant="outline">
            <Database className="h-4 w-4 mr-2" />
            Import Dataset
          </Button>
          <Button variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Collaborate
          </Button>
        </div>

        {/* Training Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flask className="h-5 w-5" />
              Model Training
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Experiment name..."
                value={experimentName}
                onChange={(e) => setExperimentName(e.target.value)}
              />
              <div className="flex gap-2">
                {!isTraining ? (
                  <Button onClick={startTraining} className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Start Training
                  </Button>
                ) : (
                  <Button onClick={stopTraining} variant="destructive" className="flex-1">
                    <Pause className="h-4 w-4 mr-2" />
                    Stop Training
                  </Button>
                )}
              </div>
            </div>

            {isTraining && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Training Progress</span>
                  <span>{trainingProgress}%</span>
                </div>
                <Progress value={trainingProgress} className="w-full" />
                <p className="text-xs text-muted-foreground">
                  Estimated time remaining: {Math.max(0, Math.ceil((100 - trainingProgress) / 2))} minutes
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="experiments">Experiments</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
            <TabsTrigger value="datasets">Datasets</TabsTrigger>
            <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
          </TabsList>

          <TabsContent value="experiments" className="space-y-6">
            <div className="grid gap-4">
              {experiments.map((experiment) => (
                <Card key={experiment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{experiment.name}</h3>
                        <p className="text-sm text-muted-foreground">Dataset: {experiment.dataset}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={getStatusColor(experiment.status)}>
                          {experiment.status}
                        </Badge>
                        <div className="text-right">
                          <div className="text-sm font-medium">Accuracy: {experiment.accuracy}%</div>
                          <div className="text-xs text-muted-foreground">Duration: {experiment.duration}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {models.map((model, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{model.name}</CardTitle>
                    <Badge variant="outline">{model.type}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Parameters:</span>
                      <span className="font-medium">{model.parameters}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Performance:</span>
                      <span className="font-medium">{model.performance}</span>
                    </div>
                    <Button size="sm" className="w-full mt-4">
                      Load Model
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="datasets" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {datasets.map((dataset, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{dataset.name}</CardTitle>
                    <Badge variant="outline">{dataset.type}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Size:</span>
                      <span className="font-medium">{dataset.size}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Samples:</span>
                      <span className="font-medium">{dataset.samples}</span>
                    </div>
                    <Button size="sm" className="w-full mt-4">
                      Load Dataset
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collaboration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Research Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Collaborate with Researchers</h3>
                  <p className="text-muted-foreground mb-4">
                    Share experiments, datasets, and findings with the research community
                  </p>
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    Join Research Groups
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Features Grid */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Flask className="h-8 w-8 mx-auto mb-3 text-indigo-500" />
              <h3 className="font-semibold mb-2">Model Training</h3>
              <p className="text-sm text-muted-foreground">
                Train custom AI models with your own datasets
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Database className="h-8 w-8 mx-auto mb-3 text-purple-500" />
              <h3 className="font-semibold mb-2">Experiment Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Track and compare model performance across experiments
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="h-8 w-8 mx-auto mb-3 text-blue-500" />
              <h3 className="font-semibold mb-2">Team Collaboration</h3>
              <p className="text-sm text-muted-foreground">
                Share research and collaborate with team members
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIResearchLab;