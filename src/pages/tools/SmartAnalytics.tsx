import { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, TrendingUp, PieChart, LineChart, Upload, Download, Brain, Target } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Cell } from 'recharts';
import { toast } from 'sonner';

const SmartAnalytics = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data
  const salesData = [
    { month: 'Jan', sales: 4000, profit: 2400 },
    { month: 'Feb', sales: 3000, profit: 1398 },
    { month: 'Mar', sales: 2000, profit: 9800 },
    { month: 'Apr', sales: 2780, profit: 3908 },
    { month: 'May', sales: 1890, profit: 4800 },
    { month: 'Jun', sales: 2390, profit: 3800 }
  ];

  const categoryData = [
    { name: 'AI Tools', value: 35, color: '#8884d8' },
    { name: 'Courses', value: 25, color: '#82ca9d' },
    { name: 'Templates', value: 20, color: '#ffc658' },
    { name: 'Services', value: 20, color: '#ff7300' }
  ];

  const trendData = [
    { date: '2024-01', users: 1200, engagement: 65 },
    { date: '2024-02', users: 1350, engagement: 68 },
    { date: '2024-03', users: 1100, engagement: 62 },
    { date: '2024-04', users: 1600, engagement: 72 },
    { date: '2024-05', users: 1800, engagement: 75 },
    { date: '2024-06', users: 2100, engagement: 78 }
  ];

  const insights = [
    {
      title: "Revenue Growth",
      value: "+23.5%",
      description: "Compared to last quarter",
      trend: "up",
      color: "text-green-600"
    },
    {
      title: "Customer Acquisition",
      value: "+15.2%",
      description: "New customers this month",
      trend: "up",
      color: "text-blue-600"
    },
    {
      title: "Conversion Rate",
      value: "4.8%",
      description: "Above industry average",
      trend: "stable",
      color: "text-purple-600"
    },
    {
      title: "Churn Rate",
      value: "-2.1%",
      description: "Improved retention",
      trend: "down",
      color: "text-orange-600"
    }
  ];

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      toast.success('Analysis completed! New insights generated.');
    }, 2000);
  };

  const exportReport = () => {
    toast.success('Report exported successfully!');
  };

  return (
    <div className="min-h-screen bg-background">
      
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Smart Analytics</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Automated data analysis and insights generation for your business metrics
          </p>
          <Badge className="mt-4 bg-emerald-100 text-emerald-800">Pro Plan</Badge>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import Data
            </Button>
            <Button variant="outline" size="sm" onClick={exportReport}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
          <Button onClick={handleAnalyze} disabled={isAnalyzing}>
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Generate Insights
              </>
            )}
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {insights.map((insight, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{insight.title}</p>
                    <p className={`text-2xl font-bold ${insight.color}`}>{insight.value}</p>
                    <p className="text-xs text-muted-foreground">{insight.description}</p>
                  </div>
                  <TrendingUp className={`h-8 w-8 ${insight.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="sales" fill="#8884d8" />
                        <Bar dataKey="profit" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <RechartsPieChart data={categoryData} cx="50%" cy="50%" outerRadius={80}>
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </RechartsPieChart>
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="profit" stroke="#82ca9d" strokeWidth={2} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Growth & Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="engagement" stroke="#82ca9d" strokeWidth={2} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  AI Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Revenue Forecast</h4>
                    <p className="text-sm text-blue-700">
                      Based on current trends, revenue is projected to increase by 28% next quarter.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Customer Behavior</h4>
                    <p className="text-sm text-green-700">
                      AI tools category shows highest engagement. Consider expanding this segment.
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-800 mb-2">Risk Assessment</h4>
                    <p className="text-sm text-orange-700">
                      Low churn risk detected. Customer satisfaction remains high.
                    </p>
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
              <Brain className="h-8 w-8 mx-auto mb-3 text-emerald-500" />
              <h3 className="font-semibold mb-2">Predictive Analytics</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered forecasting and trend prediction
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <BarChart3 className="h-8 w-8 mx-auto mb-3 text-teal-500" />
              <h3 className="font-semibold mb-2">Report Generation</h3>
              <p className="text-sm text-muted-foreground">
                Automated report creation with actionable insights
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <PieChart className="h-8 w-8 mx-auto mb-3 text-blue-500" />
              <h3 className="font-semibold mb-2">Data Visualization</h3>
              <p className="text-sm text-muted-foreground">
                Interactive charts and visual data representation
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SmartAnalytics;