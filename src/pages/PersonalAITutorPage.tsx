import { Bot, Brain, Sparkles, MessageSquare, BookOpen, Target, TrendingUp, Zap, Calendar, Clock, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const PersonalAITutorPage = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const tutorFeatures = [
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "Adaptive Learning",
      description: "AI adjusts to your learning pace and style"
    },
    {
      icon: <Target className="h-8 w-8 text-accent-foreground" />,
      title: "Personalized Path",
      description: "Custom curriculum based on your goals"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "24/7 Availability",
      description: "Learn anytime, anywhere, at your own pace"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-accent-foreground" />,
      title: "Progress Tracking",
      description: "Real-time insights on your learning journey"
    }
  ];

  const recentSessions = [
    {
      id: 1,
      topic: "Deep Learning Fundamentals",
      date: "2024-01-15",
      duration: "45 mins",
      progress: 85,
      status: "completed"
    },
    {
      id: 2,
      topic: "Neural Network Architecture",
      date: "2024-01-14",
      duration: "60 mins",
      progress: 70,
      status: "completed"
    },
    {
      id: 3,
      topic: "Natural Language Processing",
      date: "2024-01-13",
      duration: "50 mins",
      progress: 90,
      status: "completed"
    }
  ];

  const learningGoals = [
    {
      id: 1,
      title: "Master Machine Learning",
      progress: 65,
      deadline: "2024-03-01",
      status: "in-progress"
    },
    {
      id: 2,
      title: "Build AI Applications",
      progress: 40,
      deadline: "2024-04-15",
      status: "in-progress"
    },
    {
      id: 3,
      title: "AI Career Certification",
      progress: 80,
      deadline: "2024-02-28",
      status: "in-progress"
    }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error('Please enter a question');
      return;
    }
    
    setIsLoading(true);
    // Simulate AI response
    setTimeout(() => {
      toast.success('Your AI tutor is preparing a personalized response...');
      setMessage('');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Bot className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Learning</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Personal <span className="text-primary">AI Tutor</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get personalized guidance, instant answers, and adaptive learning paths tailored to your goals
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tutorFeatures.map((feature, idx) => (
            <Card key={idx} className="text-center">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chat Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Ask Your AI Tutor
                </CardTitle>
                <CardDescription>Get instant, personalized answers to your questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Ask anything about AI, programming, career guidance, or learning strategies..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={handleSendMessage} disabled={isLoading} className="flex-1 gap-2">
                    {isLoading ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Ask AI Tutor
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Zap className="h-4 w-4" />
                    Quick Tips
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Recent Learning Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <div key={session.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-3">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold">{session.topic}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {session.duration}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{session.date}</p>
                      </div>
                      <Button variant="ghost" size="sm">Review</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-primary" />
                  Learning Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {learningGoals.map((goal) => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-sm font-medium">{goal.title}</span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{goal.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Due: {goal.deadline}</p>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Set New Goal
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                  <Calendar className="h-4 w-4" />
                  Schedule Session
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                  <BookOpen className="h-4 w-4" />
                  Browse Topics
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                  <Award className="h-4 w-4" />
                  View Progress
                </Button>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
              <CardContent className="pt-6 text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold mb-1">24</div>
                <div className="text-sm text-muted-foreground mb-3">Hours This Month</div>
                <Badge variant="secondary">+15% from last month</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalAITutorPage;
