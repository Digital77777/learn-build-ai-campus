import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Brain, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StarterDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Welcome to Starter Tier</h2>
        <p className="text-muted-foreground">Access essential AI learning tools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/learning-paths')}>
          <CardHeader>
            <BookOpen className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Learning Paths</CardTitle>
            <CardDescription>Start your AI education journey</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Explore Courses</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/ai-tools')}>
          <CardHeader>
            <Brain className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Basic AI Tools</CardTitle>
            <CardDescription>Access 3 essential AI tools</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">View Tools</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/community')}>
          <CardHeader>
            <Users className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Community</CardTitle>
            <CardDescription>Connect with learners</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Join Community</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
