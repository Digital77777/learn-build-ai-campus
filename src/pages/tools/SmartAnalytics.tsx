import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, TrendingUp, Brain } from 'lucide-react';
import ChartLoader from '@/components/ChartLoader';
import useVisibility from '@/hooks/useVisibility';
import { toast } from 'sonner';

const SmartAnalytics = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const salesData = useMemo(() => [
    { month: 'Jan', value: 400 },
    { month: 'Feb', value: 300 },
    { month: 'Mar', value: 500 },
    { month: 'Apr', value: 700 },
  ], []);

  const handleAnalyze = useCallback(async () => {
    setIsAnalyzing(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      toast.success('Insights generated');
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const chartVisibility = useVisibility();

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Smart Analytics</h1>
          <p className="text-muted-foreground">Insights and interactive charts</p>
        </div>
        <Badge variant="secondary" className="ml-auto">Beta</Badge>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3 items-center">
          <Input placeholder="Search dataset..." />
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => toast('Export started')}> 
            <TrendingUp className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAnalyze} disabled={isAnalyzing}> 
            {isAnalyzing ? 'Analyzing...' : <>
              <Brain className="h-4 w-4 mr-2" />
              Generate Insights
            </>} 
          </Button>
        </div>
      </div>

      <div ref={chartVisibility.ref as any} className="mb-8">
        <ChartLoader
          loader={() => import('recharts').then((mod) => ({ default: mod }))}
          render={(Recharts: any) => {
            const { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } = Recharts;
            return (
              <div style={{ width: '100%', height: 320 }}>
                <ResponsiveContainer>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            );
          }}
        />
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={(v) => setActiveTab(v)}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Quick summary of your data</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>Actionable Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>Increase conversions in March</li>
                <li>Focus on product pages</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default React.memo(SmartAnalytics);