import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, DollarSign, Target, ArrowUpRight, ArrowDownRight, Activity, Crown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AnalyticsPage() {
  const kpis = [
    { label: 'Total Revenue', value: 'R12,450', change: '+23%', trend: 'up', icon: DollarSign },
    { label: 'Active Referrals', value: '47', change: '+12%', trend: 'up', icon: Users },
    { label: 'Conversion Rate', value: '34%', change: '-5%', trend: 'down', icon: Target },
    { label: 'Tool Usage', value: '892h', change: '+45%', trend: 'up', icon: Activity }
  ];

  const toolsPerformance = [
    { name: 'AI Code Assistant', usage: 85, revenue: 'R4,200' },
    { name: 'Data2App', usage: 72, revenue: 'R3,100' },
    { name: 'AI Tutor Lab', usage: 68, revenue: 'R2,800' },
    { name: 'Smart Analytics', usage: 45, revenue: 'R1,950' }
  ];

  const referralStats = [
    { period: 'This Month', conversions: 12, earnings: 'R3,400' },
    { period: 'Last Month', conversions: 9, earnings: 'R2,700' },
    { period: 'All Time', conversions: 47, earnings: 'R12,450' }
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex items-center gap-3 mb-8">
        <Crown className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Advanced Analytics</h1>
          <p className="text-muted-foreground">Deep insights into your performance and earnings</p>
        </div>
        <Badge variant="default" className="ml-auto">Career Tier</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center gap-1 text-sm mt-1">
                  {kpi.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span className={kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                    {kpi.change}
                  </span>
                  <span className="text-muted-foreground">vs last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="tools" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tools">Tool Performance</TabsTrigger>
          <TabsTrigger value="referrals">Referral Analytics</TabsTrigger>
          <TabsTrigger value="forecast">Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Tools</CardTitle>
              <CardDescription>Your most used AI tools and their contribution to revenue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {toolsPerformance.map((tool) => (
                <div key={tool.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{tool.name}</p>
                      <p className="text-xs text-muted-foreground">{tool.revenue} generated</p>
                    </div>
                    <Badge variant="outline">{tool.usage}%</Badge>
                  </div>
                  <Progress value={tool.usage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Referral Performance</CardTitle>
              <CardDescription>Track your referral conversions and earnings over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {referralStats.map((stat) => (
                  <div key={stat.period} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{stat.period}</p>
                      <p className="text-sm text-muted-foreground">{stat.conversions} conversions</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">{stat.earnings}</p>
                      <p className="text-xs text-muted-foreground">earned</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Forecast</CardTitle>
              <CardDescription>AI-powered predictions based on your current performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-1">Next Month</p>
                  <p className="text-2xl font-bold">R14,200</p>
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3" />
                    +14% projected
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-1">3 Months</p>
                  <p className="text-2xl font-bold">R48,500</p>
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3" />
                    +29% projected
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-1">Annual</p>
                  <p className="text-2xl font-bold">R187,300</p>
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3" />
                    +51% projected
                  </p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                <TrendingUp className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Growth Opportunities</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Focus on AI Code Assistant (+32% conversion potential)</li>
                  <li>• Increase referral outreach (+R5,200 monthly)</li>
                  <li>• Leverage marketplace listings (+18% visibility)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
