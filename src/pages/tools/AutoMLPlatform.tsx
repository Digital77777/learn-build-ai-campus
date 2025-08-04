import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, Upload, Settings, BarChart3, Cpu, Cloud, Target, Rocket } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { toast } from 'sonner';

const AutoMLPlatform = () => {
  const [projectName, setProjectName] = useState('');
  const [problemType, setProblemType] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('create');

  const problemTypes = [
    { value: 'classification', label: 'Classification', description: 'Categorize data into classes' },
    { value: 'regression', label: 'Regression', description: 'Predict numerical values' },
    { value: 'clustering', label: 'Clustering', description: 'Group similar data points' },
    { value: 'forecasting', label: 'Time Series Forecasting', description: 'Predict future trends' }
  ];

  const modelPerformance = [
    { model: 'Random Forest', accuracy: 94.2, training_time: '5m' },
    { model: 'XGBoost', accuracy: 96.1, training_time: '8m' },
    { model: 'Neural Network', accuracy: 95.8, training_time: '15m' },
    { model: 'SVM', accuracy: 92.3, training_time: '3m' }
  ];

  const trainingMetrics = [
    { epoch: 1, accuracy: 0.65, loss: 0.8 },
    { epoch: 2, accuracy: 0.72, loss: 0.6 },
    { epoch: 3, accuracy: 0.78, loss: 0.45 },
    { epoch: 4, accuracy: 0.84, loss: 0.32 },
    { epoch: 5, accuracy: 0.89, loss: 0.25 },
    { epoch: 6, accuracy: 0.92, loss: 0.18 }
  ];

  const projects = [
    {
      id: '1',
      name: 'Customer Churn Prediction',
      type: 'Classification',
      status: 'Completed',
      accuracy: 94.2,
      created: '2024-01-15'
    },
    {
      id: '2',
      name: 'Sales Forecasting',
      type: 'Regression',
      status: 'Training',
      accuracy: 87.5,
      created: '2024-01-20'
    },
    {
      id: '3',
      name: 'Product Recommendation',
      type: 'Classification',
      status: 'Deployed',
      accuracy: 91.8,
      created: '2024-01-10'
    }
  ];

  const startAutoML = () => {
    if (!projectName.trim() || !problemType) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    // Simulate AutoML process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          toast.success('AutoML pipeline completed! Best model found: XGBoost (96.1% accuracy)');
          return 100;
        }
        return prev + 1;
      });
    }, 50);
  };

  const deployModel = (projectId: string) => {
    toast.success('Model deployed successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Training':
        return 'bg-blue-100 text-blue-800';
      case 'Deployed':
        return 'bg-purple-100 text-purple-800';
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
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">AutoML Platform</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Automated machine learning pipeline for rapid model development
          </p>
          <Badge className="mt-4 bg-yellow-100 text-yellow-800">Pro Plan</Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="create">Create Project</TabsTrigger>
            <TabsTrigger value="projects">My Projects</TabsTrigger>
            <TabsTrigger value="models">Model Performance</TabsTrigger>
            <TabsTrigger value="deploy">Deployment</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Project Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Project Name</label>
                    <Input
                      placeholder="Enter project name..."
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Problem Type</label>
                    <Select value={problemType} onValueChange={setProblemType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select problem type" />
                      </SelectTrigger>
                      <SelectContent>
                        {problemTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-xs text-muted-foreground">{type.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Dataset</label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload your dataset (CSV, JSON, or Excel)
                      </p>
                      <Button variant="outline" size="sm">
                        Choose File
                      </Button>
                    </div>
                  </div>

                  <Button 
                    onClick={startAutoML} 
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Start AutoML
                      </>
                    )}
                  </Button>

                  {isProcessing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>AutoML Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="w-full" />
                      <p className="text-xs text-muted-foreground">
                        {progress < 30 ? 'Analyzing data...' :
                         progress < 60 ? 'Feature engineering...' :
                         progress < 90 ? 'Training models...' : 'Evaluating results...'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AutoML Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
                      <div>
                        <h4 className="font-medium">Data Analysis</h4>
                        <p className="text-xs text-muted-foreground">Automatic data profiling and quality assessment</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
                      <div>
                        <h4 className="font-medium">Feature Engineering</h4>
                        <p className="text-xs text-muted-foreground">Automated feature selection and transformation</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</div>
                      <div>
                        <h4 className="font-medium">Model Selection</h4>
                        <p className="text-xs text-muted-foreground">Test multiple algorithms and hyperparameters</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">4</div>
                      <div>
                        <h4 className="font-medium">Deployment</h4>
                        <p className="text-xs text-muted-foreground">One-click deployment to production</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="space-y-4">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">Type: {project.type}</p>
                        <p className="text-xs text-muted-foreground">Created: {project.created}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <div className="text-right">
                          <div className="text-sm font-medium">Accuracy: {project.accuracy}%</div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          {project.status === 'Completed' && (
                            <Button size="sm" onClick={() => deployModel(project.id)}>
                              <Rocket className="h-4 w-4 mr-1" />
                              Deploy
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Model Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {modelPerformance.map((model, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <div className="font-medium">{model.model}</div>
                          <div className="text-xs text-muted-foreground">Training: {model.training_time}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary">{model.accuracy}%</div>
                          <div className="text-xs text-muted-foreground">Accuracy</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Training Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trainingMetrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="epoch" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="accuracy" stroke="#8884d8" strokeWidth={2} />
                        <Line type="monotone" dataKey="loss" stroke="#82ca9d" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="deploy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5" />
                  Model Deployment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 border-2 border-dashed border-primary/25 rounded-lg">
                    <Cloud className="h-12 w-12 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">Cloud API</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Deploy as REST API endpoint
                    </p>
                    <Button size="sm">Deploy to Cloud</Button>
                  </div>
                  
                  <div className="text-center p-6 border-2 border-dashed border-primary/25 rounded-lg">
                    <Cpu className="h-12 w-12 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">Edge Device</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Optimize for mobile/IoT devices
                    </p>
                    <Button size="sm">Export Model</Button>
                  </div>
                  
                  <div className="text-center p-6 border-2 border-dashed border-primary/25 rounded-lg">
                    <Target className="h-12 w-12 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">Batch Processing</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Process large datasets offline
                    </p>
                    <Button size="sm">Setup Batch</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Features Grid */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Zap className="h-8 w-8 mx-auto mb-3 text-yellow-500" />
              <h3 className="font-semibold mb-2">Auto Feature Engineering</h3>
              <p className="text-sm text-muted-foreground">
                Automatically discover and create optimal features
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <BarChart3 className="h-8 w-8 mx-auto mb-3 text-orange-500" />
              <h3 className="font-semibold mb-2">Model Selection</h3>
              <p className="text-sm text-muted-foreground">
                Test and compare multiple ML algorithms automatically
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Rocket className="h-8 w-8 mx-auto mb-3 text-blue-500" />
              <h3 className="font-semibold mb-2">One-Click Deployment</h3>
              <p className="text-sm text-muted-foreground">
                Deploy models to production with a single click
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AutoMLPlatform;