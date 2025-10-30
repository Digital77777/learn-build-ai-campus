import { Award, BookOpen, CheckCircle, Clock, Download, FileText, Trophy, Target, Star, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

const CareerCertificationPage = () => {
  const navigate = useNavigate();

  const certifications = [
    {
      id: 1,
      title: "AI Fundamentals Specialist",
      level: "Foundation",
      progress: 100,
      status: "completed",
      topics: ["AI Basics", "Machine Learning", "Neural Networks", "Data Science"],
      duration: "20 hours",
      earnedDate: "2024-12-15"
    },
    {
      id: 2,
      title: "AI Developer Professional",
      level: "Intermediate",
      progress: 65,
      status: "in-progress",
      topics: ["Deep Learning", "NLP", "Computer Vision", "AI APIs"],
      duration: "40 hours",
      earnedDate: null
    },
    {
      id: 3,
      title: "AI Solutions Architect",
      level: "Advanced",
      progress: 0,
      status: "locked",
      topics: ["AI Strategy", "System Design", "MLOps", "AI Ethics"],
      duration: "60 hours",
      earnedDate: null
    },
    {
      id: 4,
      title: "AI Business Leader",
      level: "Expert",
      progress: 0,
      status: "locked",
      topics: ["AI Transformation", "Team Leadership", "ROI Analysis", "Innovation"],
      duration: "50 hours",
      earnedDate: null
    }
  ];

  const benefits = [
    "Industry-recognized credentials",
    "Career advancement opportunities",
    "Higher earning potential",
    "Professional networking access",
    "Lifetime certificate validity",
    "Digital badge for LinkedIn"
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Trophy className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Career Certification Program</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Earn Professional <span className="text-primary">AI Certifications</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Validate your AI expertise with industry-recognized certifications that accelerate your career
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Award className="h-8 w-8 text-primary mb-2" />
                <div className="text-3xl font-bold">1</div>
                <div className="text-sm text-muted-foreground">Earned</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Target className="h-8 w-8 text-accent-foreground mb-2" />
                <div className="text-3xl font-bold">1</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Star className="h-8 w-8 text-primary mb-2" />
                <div className="text-3xl font-bold">65%</div>
                <div className="text-sm text-muted-foreground">Overall Progress</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Zap className="h-8 w-8 text-accent-foreground mb-2" />
                <div className="text-3xl font-bold">20</div>
                <div className="text-sm text-muted-foreground">Hours Completed</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 max-w-3xl mx-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="progress">In Progress</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {certifications.map((cert) => (
              <Card key={cert.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <CardTitle className="text-xl md:text-2xl">{cert.title}</CardTitle>
                        <Badge variant={cert.status === 'completed' ? 'default' : cert.status === 'in-progress' ? 'secondary' : 'outline'}>
                          {cert.level}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-4 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {cert.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {cert.topics.length} Topics
                        </span>
                      </CardDescription>
                    </div>
                    {cert.status === 'completed' && (
                      <Button variant="outline" size="sm" className="gap-2 w-full md:w-auto">
                        <Download className="h-4 w-4" />
                        Download Certificate
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{cert.progress}%</span>
                    </div>
                    <Progress value={cert.progress} className="h-2" />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cert.topics.map((topic, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>

                  {cert.earnedDate && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Completed on {new Date(cert.earnedDate).toLocaleDateString()}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    {cert.status === 'in-progress' && (
                      <Button className="flex-1">Continue Learning</Button>
                    )}
                    {cert.status === 'locked' && (
                      <Button variant="outline" className="flex-1" disabled>
                        Complete Previous Certification
                      </Button>
                    )}
                    {cert.status === 'completed' && (
                      <Button variant="secondary" className="flex-1 gap-2">
                        <FileText className="h-4 w-4" />
                        View Certificate
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed">
            <div className="space-y-6">
              {certifications.filter(c => c.status === 'completed').map((cert) => (
                <Card key={cert.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      {cert.title}
                    </CardTitle>
                    <CardDescription>Completed on {cert.earnedDate && new Date(cert.earnedDate).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="gap-2">
                      <Download className="h-4 w-4" />
                      Download Certificate
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="space-y-6">
              {certifications.filter(c => c.status === 'in-progress').map((cert) => (
                <Card key={cert.id}>
                  <CardHeader>
                    <CardTitle>{cert.title}</CardTitle>
                    <CardDescription>{cert.progress}% Complete</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={cert.progress} className="mb-4" />
                    <Button>Continue Learning</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="available">
            <div className="space-y-6">
              {certifications.filter(c => c.status === 'locked').map((cert) => (
                <Card key={cert.id}>
                  <CardHeader>
                    <CardTitle>{cert.title}</CardTitle>
                    <CardDescription>{cert.duration} of learning</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" disabled>Unlock by completing prerequisites</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Benefits Section */}
        <Card className="mt-12 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="text-2xl">Certification Benefits</CardTitle>
            <CardDescription>Why our certifications matter for your career</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerCertificationPage;
