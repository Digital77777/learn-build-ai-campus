import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  Upload, 
  Download, 
  Search, 
  Filter,
  PieChart,
  LineChart,
  Table as TableIcon,
  Globe,
  Eye,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart as RechartsLineChart, Line } from 'recharts';

const Data2App = () => {
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChart, setSelectedChart] = useState('bar');
  const [selectedColumn, setSelectedColumn] = useState('category');

  // Sample data that would come from uploaded spreadsheet
  const sampleData = [
    { category: 'Sales', value: 4500, month: 'Jan', region: 'North' },
    { category: 'Marketing', value: 3200, month: 'Jan', region: 'South' },
    { category: 'Support', value: 2800, month: 'Jan', region: 'East' },
    { category: 'Development', value: 5200, month: 'Jan', region: 'West' },
    { category: 'Sales', value: 4800, month: 'Feb', region: 'North' },
    { category: 'Marketing', value: 3600, month: 'Feb', region: 'South' }
  ];

  const filteredData = sampleData.filter(item => 
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chartData = selectedColumn === 'category' 
    ? sampleData.reduce((acc, item) => {
        const existing = acc.find(a => a.name === item.category);
        if (existing) {
          existing.value += item.value;
        } else {
          acc.push({ name: item.category, value: item.value });
        }
        return acc;
      }, [] as any[])
    : sampleData.reduce((acc, item) => {
        const existing = acc.find(a => a.name === item.region);
        if (existing) {
          existing.value += item.value;
        } else {
          acc.push({ name: item.region, value: item.value });
        }
        return acc;
      }, [] as any[]);

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe'];

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      toast({
        title: "File uploaded successfully",
        description: `${file.name} is ready for processing`
      });
    }
  }, [toast]);

  const handleExportApp = useCallback(() => {
    toast({
      title: "Web app exported",
      description: "Your dashboard is ready to deploy"
    });
  }, [toast]);

  const handlePreview = useCallback(() => {
    toast({
      title: "Preview opened",
      description: "Viewing your generated dashboard"
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Data2App</h1>
              <p className="text-muted-foreground">Transform spreadsheets into instant dashboards</p>
            </div>
            <Badge variant="secondary" className="ml-auto">Free</Badge>
          </div>
          
          <div className="flex gap-3 items-center">
            <Button variant="outline" onClick={handlePreview} size="sm">
              <Eye className="h-4 w-4" />
            </Button>
            <Button onClick={handleExportApp} disabled={!uploadedFile} size="sm">
              <Globe className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Upload & Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Data Source
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* File Upload */}
              <div>
                <Label htmlFor="file-upload" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Data Source
                </Label>
                <div className="mt-2 border-2 border-dashed border-border rounded-lg p-4 text-center">
                  <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground mb-2">
                    CSV, Excel, Google Sheets
                  </p>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Label htmlFor="file-upload">
                    <Button variant="outline" size="sm" asChild>
                      <span>
                        <Upload className="h-3 w-3 mr-1" />
                        Browse
                      </span>
                    </Button>
                  </Label>
                </div>
                {uploadedFile && (
                  <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    {uploadedFile}
                  </div>
                )}
              </div>

              {/* Chart Type */}
              <div>
                <Label className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Chart Type
                </Label>
                <Select value={selectedChart} onValueChange={setSelectedChart}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Bar Chart
                      </div>
                    </SelectItem>
                    <SelectItem value="pie">
                      <div className="flex items-center gap-2">
                        <PieChart className="h-4 w-4" />
                        Pie Chart
                      </div>
                    </SelectItem>
                    <SelectItem value="line">
                      <div className="flex items-center gap-2">
                        <LineChart className="h-4 w-4" />
                        Line Chart
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Group By */}
              <div>
                <Label className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Group By
                </Label>
                <Select value={selectedColumn} onValueChange={setSelectedColumn}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="category">Category</SelectItem>
                    <SelectItem value="region">Region</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search */}
              <div>
                <Label className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </Label>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Filter data..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Preview */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Generated Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="charts" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="charts">Charts</TabsTrigger>
                  <TabsTrigger value="table">Data Table</TabsTrigger>
                  <TabsTrigger value="export">Export Options</TabsTrigger>
                </TabsList>
                
                <TabsContent value="charts" className="space-y-4">
                  <div className="h-80">
                    {selectedChart === 'bar' && (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                    
                    {selectedChart === 'pie' && (
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Tooltip />
                          <Cell />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    )}
                    
                    {selectedChart === 'line' && (
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="value" stroke="#8884d8" />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="table" className="space-y-4">
                  <div className="border rounded-lg">
                    <div className="p-4 border-b">
                      <h3 className="font-medium flex items-center gap-2">
                        <TableIcon className="h-4 w-4" />
                        Data Table ({filteredData.length} rows)
                      </h3>
                    </div>
                    <div className="max-h-64 overflow-auto">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="text-left p-3 text-sm font-medium">Category</th>
                            <th className="text-left p-3 text-sm font-medium">Value</th>
                            <th className="text-left p-3 text-sm font-medium">Month</th>
                            <th className="text-left p-3 text-sm font-medium">Region</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData.map((item, index) => (
                            <tr key={index} className="border-t">
                              <td className="p-3 text-sm">{item.category}</td>
                              <td className="p-3 text-sm">{item.value.toLocaleString()}</td>
                              <td className="p-3 text-sm">{item.month}</td>
                              <td className="p-3 text-sm">{item.region}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="export" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Web App</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Export as a standalone web application with interactive dashboard
                      </p>
                      <Button className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Export Web App
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Dashboard Only</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Export just the dashboard component for embedding
                      </p>
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Export Dashboard
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Features Included:</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        Interactive charts
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        Search & filter
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        Responsive design
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        No-code setup
                      </div>
                    </div>
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

export default Data2App;