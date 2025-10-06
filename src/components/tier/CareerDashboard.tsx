import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Brain, Store, Gift, TrendingUp, Sparkles, Zap, Crown, HeadphonesIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CareerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Crown className="h-8 w-8 text-yellow-500" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 via-primary to-purple-500 bg-clip-text text-transparent">
            Career Tier Dashboard
          </h2>
          <Crown className="h-8 w-8 text-yellow-500" />
        </div>
        <p className="text-muted-foreground">Full platform access with premium features</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-transparent" onClick={() => navigate('/learning-paths')}>
          <CardHeader>
            <BookOpen className="h-8 w-8 text-primary mb-2" />
            <CardTitle>All Learning Paths</CardTitle>
            <CardDescription>Complete course library</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Start Learning</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-transparent" onClick={() => navigate('/ai-tools')}>
          <CardHeader>
            <Brain className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Unlimited AI Tools</CardTitle>
            <CardDescription>All tools unlocked</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Access Tools</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-transparent" onClick={() => navigate('/marketplace')}>
          <CardHeader>
            <Store className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Unlimited Listings</CardTitle>
            <CardDescription>No listing limits</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Manage Store</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-transparent" onClick={() => navigate('/referral')}>
          <CardHeader>
            <Gift className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Premium Referrals</CardTitle>
            <CardDescription>Higher rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Earn More</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-transparent">
          <CardHeader>
            <TrendingUp className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Advanced Analytics</CardTitle>
            <CardDescription>Deep insights & reports</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">View Analytics</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-transparent">
          <CardHeader>
            <Sparkles className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Pro Creator Suite</CardTitle>
            <CardDescription>Full content toolkit</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Launch Suite</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-transparent">
          <CardHeader>
            <Zap className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Priority Access</CardTitle>
            <CardDescription>First to new features</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Early Access</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-transparent">
          <CardHeader>
            <HeadphonesIcon className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Premium Support</CardTitle>
            <CardDescription>24/7 priority support</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Contact Support</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-transparent">
          <CardHeader>
            <Crown className="h-8 w-8 text-yellow-500 mb-2" />
            <CardTitle>Exclusive Access</CardTitle>
            <CardDescription>VIP community & events</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Join VIP</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
