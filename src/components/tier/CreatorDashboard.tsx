import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Brain, Store, Gift, TrendingUp, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CreatorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Creator Tier Dashboard
        </h2>
        <p className="text-muted-foreground">Unlock advanced tools and marketplace access</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-primary/20" onClick={() => navigate('/learning-paths')}>
          <CardHeader>
            <BookOpen className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Learning Paths</CardTitle>
            <CardDescription>All courses unlocked</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Continue Learning</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-primary/20" onClick={() => navigate('/ai-tools')}>
          <CardHeader>
            <Brain className="h-8 w-8 text-primary mb-2" />
            <CardTitle>AI Tools</CardTitle>
            <CardDescription>Access 10 advanced tools</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Explore Tools</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-primary/20" onClick={() => navigate('/marketplace')}>
          <CardHeader>
            <Store className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Marketplace</CardTitle>
            <CardDescription>List up to 10 products</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Open Marketplace</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-primary/20" onClick={() => navigate('/referral')}>
          <CardHeader>
            <Gift className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Referrals</CardTitle>
            <CardDescription>Earn rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Start Referring</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-primary/20">
          <CardHeader>
            <TrendingUp className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Track your progress</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">View Stats</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-primary/20">
          <CardHeader>
            <Sparkles className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Creator Tools</CardTitle>
            <CardDescription>Content creation suite</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Launch Tools</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
