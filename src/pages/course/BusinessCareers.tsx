import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Play, 
  CheckCircle,
  ArrowRight,
  GraduationCap,
  Target,
  Trophy,
  Download,
  Video,
  Briefcase,
  TrendingUp,
  Rocket
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const BusinessCareers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const courseModules = [
    {
      id: 1,
      title: "AI for Business Strategy",
      description: "Strategic AI adoption, ROI analysis, and organizational transformation",
      duration: "3 weeks",
      lessons: 10,
      completed: false,
      topics: [
        "AI Strategy Development",
        "Business Case for AI",
        "ROI Analysis & Measurement",
        "AI Transformation Roadmap",
        "Change Management for AI",
        "Risk Assessment & Mitigation",
        "Competitive Analysis with AI",
        "Building AI-First Culture",
        "Vendor Selection & Evaluation",
        "Case Study: Successful AI Transformations"
      ]
    },
    {
      id: 2,
      title: "AI-Powered Marketing",
      description: "Customer segmentation, personalization, content generation, and marketing automation",
      duration: "4 weeks",
      lessons: 12,
      completed: false,
      topics: [
        "AI Marketing Fundamentals",
        "Customer Segmentation with AI",
        "Personalization Engines",
        "AI Content Generation",
        "Predictive Customer Analytics",
        "Chatbots for Customer Service",
        "Email Marketing Automation",
        "Social Media AI Tools",
        "Ad Targeting & Optimization",
        "Marketing Attribution Analysis",
        "A/B Testing with AI",
        "Project: Complete Marketing Campaign"
      ]
    },
    {
      id: 3,
      title: "AI Product Management",
      description: "Building AI products, user research, feature prioritization, and go-to-market strategy",
      duration: "3 weeks",
      lessons: 10,
      completed: false,
      topics: [
        "AI Product Strategy",
        "User Research for AI Products",
        "AI Feature Prioritization",
        "Data Requirements Planning", 
        "AI Model Integration",
        "User Experience for AI",
        "AI Product Metrics",
        "Go-to-Market for AI Products",
        "Stakeholder Management",
        "Project: AI Product Launch Plan"
      ]
    },
    {
      id: 4,
      title: "Freelancing with AI",
      description: "Building an AI consulting practice, client acquisition, and service delivery",
      duration: "2 weeks",
      lessons: 8,
      completed: false,
      topics: [
        "AI Consulting Business Model",
        "Service Packaging & Pricing",
        "Client Acquisition Strategies",
        "Proposal Writing & Contracts",
        "AI Audit & Assessment Methods",
        "Delivery Frameworks",
        "Client Communication & Management",
        "Scaling Your AI Practice"
      ]
    },
    {
      id: 5,
      title: "Building AI Startups",
      description: "Startup fundamentals, MVP development, funding, and scaling AI businesses",
      duration: "4 weeks",
      lessons: 10,
      completed: false,
      topics: [
        "AI Startup Ideation",
        "Market Research & Validation",
        "MVP Development Strategy",
        "AI Technology Stack Planning",
        "Fundraising for AI Startups",
        "Team Building & Hiring",
        "AI Startup Legal Considerations",
        "Scaling AI Operations",
        "Exit Strategies",
        "Case Study: Successful AI Startups"
      ]
    }
  ];

  const learningOutcomes = [
    "Develop comprehensive AI strategies for businesses of any size",
    "Lead AI transformation initiatives and manage organizational change",
    "Create and execute AI-powered marketing campaigns",
    "Build and launch AI products from concept to market",
    "Start and scale a profitable AI consulting business",
    "Launch and manage AI-powered startups",
    "Analyze AI market opportunities and competitive landscapes",
    "Generate consistent income through AI expertise and services"
  ];

  const handleStartCourse = () => {
    toast({
      title: "Course started!",
      description: "Welcome to AI for Work & Startups. Let's transform business with AI!"
    });
  };

  const handleEnrollNow = () => {
    toast({
      title: "Enrollment successful!",
      description: "You're now enrolled in AI for Work & Startups"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">Intermediate Level</Badge>
                  <Badge variant="outline">Free Course</Badge>
                  <Badge className="bg-gradient-learning text-white">Business Focus</Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">
                  <span className="bg-gradient-learning bg-clip-text text-transparent">
                    AI for Work & Startups
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Business-focused AI training covering productivity enhancement, AI marketing, product management, 
                  freelancing opportunities, and startup creation. Perfect for entrepreneurs and business professionals.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">12-16 weeks</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Duration</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">50 lessons</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Total Lessons</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">1,487</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Students</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button size="lg" onClick={handleStartCourse}>
                  <Play className="h-5 w-5 mr-2" />
                  Start Business Journey
                </Button>
                <Button size="lg" variant="outline" onClick={handleEnrollNow}>
                  <Briefcase className="h-5 w-5 mr-2" />
                  Enroll Now
                </Button>
              </div>
            </div>

            {/* Course Preview Card */}
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Course Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Rocket className="h-12 w-12 text-primary mx-auto" />
                    <p className="text-sm text-muted-foreground">Business Success Stories</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">You'll achieve:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      AI business strategy
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Marketing automation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Freelance income
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Startup launch
                    </li>
                  </ul>
                </div>
                <div className="p-3 bg-success/10 rounded-lg">
                  <div className="text-sm font-medium text-success mb-1">Income Potential</div>
                  <div className="text-lg font-bold">$2,000-4,000/month</div>
                  <div className="text-xs text-muted-foreground">AI consulting & business</div>
                </div>
                <Button className="w-full" onClick={handleEnrollNow}>
                  Transform Your Career
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="curriculum" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="business">Business Cases</TabsTrigger>
              <TabsTrigger value="income">Income Paths</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="curriculum" className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Business-Focused AI Curriculum</h2>
                <p className="text-muted-foreground">
                  50 practical lessons designed to transform how you work and create new income opportunities with AI.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {courseModules.map((module, index) => (
                  <Card key={module.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-learning flex items-center justify-center text-sm font-medium text-white">
                            {index + 1}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{module.title}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {module.duration}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Briefcase className="h-4 w-4" />
                            {module.lessons} lessons
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {module.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {topic}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="business" className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Real Business Applications</h2>
                <p className="text-muted-foreground">
                  Study real companies and how they've successfully implemented AI to transform their business.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    company: "E-commerce Retailer",
                    challenge: "Increase conversion rates and reduce cart abandonment",
                    solution: "AI-powered personalization and recommendation engine",
                    results: "35% increase in conversions, 28% higher AOV",
                    industry: "Retail"
                  },
                  {
                    company: "SaaS Startup",
                    challenge: "Scale customer support without increasing costs", 
                    solution: "AI chatbot with escalation to human agents",
                    results: "60% reduction in support tickets, 24/7 availability",
                    industry: "Technology"
                  },
                  {
                    company: "Marketing Agency",
                    challenge: "Create personalized content at scale for 100+ clients",
                    solution: "AI content generation and automated campaign optimization",
                    results: "5x faster content creation, 45% better engagement",
                    industry: "Marketing"
                  },
                  {
                    company: "Manufacturing Company",
                    challenge: "Predict equipment failures and optimize maintenance",
                    solution: "Predictive analytics and IoT sensor integration",
                    results: "40% reduction in downtime, $2M annual savings",
                    industry: "Manufacturing"
                  }
                ].map((case_study, index) => (
                  <Card key={index} className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold">{case_study.company}</h3>
                        <Badge variant="outline">{case_study.industry}</Badge>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-medium text-destructive">Challenge: </span>
                          <span className="text-muted-foreground">{case_study.challenge}</span>
                        </div>
                        <div>
                          <span className="font-medium text-primary">Solution: </span>
                          <span className="text-muted-foreground">{case_study.solution}</span>
                        </div>
                        <div>
                          <span className="font-medium text-success">Results: </span>
                          <span className="text-muted-foreground">{case_study.results}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        View Full Case Study
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="income" className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Multiple Income Streams</h2>
                <p className="text-muted-foreground">
                  Learn how to monetize your AI knowledge through various channels and build a sustainable business.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">AI Consulting</h3>
                  <div className="text-2xl font-bold text-primary mb-2">$2k-5k/month</div>
                  <p className="text-sm text-muted-foreground">Help businesses implement AI solutions</p>
                </Card>

                <Card className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </div>
                  <h3 className="font-semibold mb-2">AI Marketing Agency</h3>
                  <div className="text-2xl font-bold text-success mb-2">$5k-15k/month</div>
                  <p className="text-sm text-muted-foreground">Run AI-powered marketing campaigns</p>
                </Card>

                <Card className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Rocket className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">AI SaaS Product</h3>
                  <div className="text-2xl font-bold text-accent mb-2">$10k+/month</div>
                  <p className="text-sm text-muted-foreground">Build and sell AI-powered software</p>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learningOutcomes.map((outcome, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-learning flex items-center justify-center mt-0.5">
                        <Target className="h-3 w-3 text-white" />
                      </div>
                      <p className="text-sm">{outcome}</p>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Graduate Success Metrics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-success">72%</div>
                    <div className="text-sm text-muted-foreground">Start AI side business</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">$3,200</div>
                    <div className="text-sm text-muted-foreground">Avg monthly income after 6 months</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">89%</div>
                    <div className="text-sm text-muted-foreground">Get promoted or new job</div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Business Transformation Stories</h2>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold">4.8</div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">1,487 reviews</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    name: "Lisa Wang",
                    role: "Launched AI Marketing Agency - $12k/month",
                    rating: 5,
                    review: "This course completely changed my business trajectory. I went from freelance marketing to running a full AI agency with 8 clients. The business frameworks are gold."
                  },
                  {
                    name: "Carlos Rodriguez",
                    role: "VP of Strategy - Fortune 500 Company",
                    rating: 5,
                    review: "Used the AI strategy frameworks to lead our company's digital transformation. Got promoted to VP within 6 months. The ROI analysis methods are incredibly valuable."
                  },
                  {
                    name: "Emma Foster",
                    role: "AI Product Manager at Startup",
                    rating: 5,
                    review: "The product management module helped me transition from traditional PM to AI PM. Now leading product at a hot AI startup with equity upside."
                  }
                ].map((review, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{review.name}</h4>
                        <p className="text-sm text-success font-medium">{review.role}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[1,2,3,4,5].map((star) => (
                            <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">"{review.review}"</p>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default BusinessCareers;