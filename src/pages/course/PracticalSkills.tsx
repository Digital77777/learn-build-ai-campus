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
  Wrench,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const PracticalSkills = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const courseModules = [
    {
      id: 1,
      title: "Master Prompt Engineering",
      description: "Learn to write effective prompts that get you better AI results every time",
      duration: "3 weeks",
      lessons: 10,
      completed: false,
      topics: [
        "Anatomy of a Great Prompt",
        "Prompt Frameworks & Templates",
        "Context Setting Techniques",
        "Chain of Thought Prompting",
        "Role-based Prompting",
        "Advanced Prompt Strategies",
        "Prompt Optimization & Testing",
        "Common Prompting Mistakes",
        "Industry-Specific Prompts",
        "Building Your Prompt Library"
      ]
    },
    {
      id: 2,
      title: "AI Tools Mastery",
      description: "Hands-on training with the most powerful AI tools for productivity and creativity",
      duration: "4 weeks",
      lessons: 12,
      completed: false,
      topics: [
        "ChatGPT Advanced Techniques",
        "Claude for Research & Analysis",
        "Midjourney & AI Art Generation",
        "AI Writing & Content Tools",
        "AI Video & Audio Creation",
        "AI Code Generation Tools",
        "AI Presentation & Design Tools",
        "AI Data Analysis Platforms",
        "Workflow Automation with AI",
        "Tool Selection & Comparison",
        "Building AI Tool Stacks",
        "ROI Measurement & Optimization"
      ]
    },
    {
      id: 3,
      title: "No-Code AI Building",
      description: "Build AI applications without coding using visual platforms and drag-drop tools",
      duration: "4 weeks",
      lessons: 14,
      completed: false,
      topics: [
        "Introduction to No-Code AI",
        "Zapier AI Automation",
        "Bubble AI App Development",
        "Airtable AI Workflows",
        "Notion AI Databases",
        "Make (Integromat) AI Scenarios",
        "AI Chatbot Builders",
        "Voice AI Applications",
        "AI Form & Survey Builders",
        "AI E-commerce Solutions",
        "Custom AI Dashboards",
        "AI Mobile App Creation",
        "Deployment & Scaling",
        "Project: Complete AI App"
      ]
    },
    {
      id: 4,
      title: "Data Handling & Analysis",
      description: "Work with data effectively for AI projects - collection, cleaning, and analysis",
      duration: "3 weeks",
      lessons: 8,
      completed: false,
      topics: [
        "Data Types & Sources",
        "Web Scraping Basics",
        "API Data Collection",
        "Data Cleaning Techniques",
        "Excel & Google Sheets AI",
        "Basic Data Visualization",
        "AI-Powered Data Analysis",
        "Building Data Pipelines"
      ]
    }
  ];

  const learningOutcomes = [
    "Write prompts that consistently generate high-quality AI outputs",
    "Use 15+ professional AI tools effectively for work and projects",
    "Build complete AI applications without writing code",
    "Collect, clean, and analyze data for AI projects",
    "Create automated workflows that save hours of manual work",
    "Design AI-powered solutions for real business problems",
    "Launch your own AI-based service or product",
    "Generate income through AI consulting and freelancing"
  ];

  const handleStartCourse = () => {
    toast({
      title: "Course started!",
      description: "Welcome to From Zero to Builder. Let's build something amazing!"
    });
  };

  const handleEnrollNow = () => {
    toast({
      title: "Enrollment successful!",
      description: "You're now enrolled in From Zero to Builder"
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
                  <Badge variant="secondary">Beginner Level</Badge>
                  <Badge variant="outline">Free Course</Badge>
                  <Badge className="bg-gradient-ai text-white">Most Popular</Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">
                  <span className="bg-gradient-ai bg-clip-text text-transparent">
                    From Zero to Builder
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Master practical AI skills that matter: prompt engineering, AI tools mastery, no-code building, 
                  and data handling. Go from complete beginner to building AI solutions in 10-14 weeks.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">10-14 weeks</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Duration</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">44 lessons</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Total Lessons</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">2,847</span>
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
                  Start Building Free
                </Button>
                <Button size="lg" variant="outline" onClick={handleEnrollNow}>
                  <Wrench className="h-5 w-5 mr-2" />
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
                    <Play className="h-12 w-12 text-primary mx-auto" />
                    <p className="text-sm text-muted-foreground">See What You'll Build</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">What you'll build:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      AI-powered chatbots
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Automated workflows
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Data analysis tools
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Complete web applications
                    </li>
                  </ul>
                </div>
                <div className="p-3 bg-success/10 rounded-lg">
                  <div className="text-sm font-medium text-success mb-1">Earning Potential</div>
                  <div className="text-lg font-bold">$1,000-2,500/month</div>
                  <div className="text-xs text-muted-foreground">From AI freelancing & consulting</div>
                </div>
                <Button className="w-full" onClick={handleEnrollNow}>
                  Start Building Today
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
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="curriculum" className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Hands-On Curriculum</h2>
                <p className="text-muted-foreground">
                  44 practical lessons focused on building real AI solutions. Every module includes hands-on projects 
                  you can add to your portfolio.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {courseModules.map((module, index) => (
                  <Card key={module.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-ai flex items-center justify-center text-sm font-medium text-white">
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
                            <Wrench className="h-4 w-4" />
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

            <TabsContent value="projects" className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Real-World Projects</h2>
                <p className="text-muted-foreground">
                  Build a portfolio of AI projects that demonstrate your skills to potential employers or clients.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "AI Customer Service Bot",
                    description: "Build a chatbot that handles customer inquiries using no-code tools",
                    tools: ["Chatfuel", "Zapier", "Google Sheets"],
                    difficulty: "Beginner"
                  },
                  {
                    title: "Content Generation Pipeline",
                    description: "Create an automated system for generating and posting social media content",
                    tools: ["OpenAI API", "Buffer", "Canva API"],
                    difficulty: "Intermediate"
                  },
                  {
                    title: "Data Analysis Dashboard",
                    description: "Build an interactive dashboard that analyzes business data using AI",
                    tools: ["Bubble", "Airtable", "Chart.js"],
                    difficulty: "Intermediate"
                  },
                  {
                    title: "AI-Powered E-commerce Store",
                    description: "Create an online store with AI product recommendations and chat support",
                    tools: ["Shopify", "Tidio", "Recombee"],
                    difficulty: "Advanced"
                  }
                ].map((project, index) => (
                  <Card key={index} className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold">{project.title}</h3>
                        <Badge variant={project.difficulty === 'Beginner' ? 'secondary' : project.difficulty === 'Intermediate' ? 'default' : 'destructive'}>
                          {project.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Tools Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tools.map((tool, toolIndex) => (
                            <Badge key={toolIndex} variant="outline" className="text-xs">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <Zap className="h-4 w-4 mr-2" />
                        View Project Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="outcomes" className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Career Outcomes</h2>
                <p className="text-muted-foreground">
                  This course is designed to get you job-ready or freelance-ready in the AI space.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learningOutcomes.map((outcome, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-ai flex items-center justify-center mt-0.5">
                        <Target className="h-3 w-3 text-white" />
                      </div>
                      <p className="text-sm">{outcome}</p>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <Trophy className="h-6 w-6 text-success" />
                  </div>
                  <h3 className="font-semibold mb-2">Job Placement</h3>
                  <div className="text-2xl font-bold text-success mb-2">78%</div>
                  <p className="text-sm text-muted-foreground">Find AI-related work within 6 months</p>
                </Card>

                <Card className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Freelance Success</h3>
                  <div className="text-2xl font-bold text-primary mb-2">$2,100</div>
                  <p className="text-sm text-muted-foreground">Average monthly earnings after 6 months</p>
                </Card>

                <Card className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Skill Confidence</h3>
                  <div className="text-2xl font-bold text-accent mb-2">94%</div>
                  <p className="text-sm text-muted-foreground">Feel confident building AI solutions</p>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Student Success Stories</h2>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold">4.8</div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">2,847 reviews</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    name: "Jessica Martinez",
                    role: "Now AI Consultant",
                    rating: 5,
                    review: "This course changed my career! I went from zero AI knowledge to making $3,000/month as a freelance AI consultant. The no-code section was a game-changer."
                  },
                  {
                    name: "David Kim",
                    role: "Product Manager at Tech Startup",
                    rating: 5,
                    review: "The practical approach is amazing. I built 4 real projects during the course and now I'm leading AI initiatives at my company. Highly recommend!"
                  },
                  {
                    name: "Rachel Thompson",
                    role: "AI Automation Specialist",
                    rating: 5,
                    review: "Perfect balance of theory and practice. The prompt engineering module alone saved me hours every week. Now I help other businesses automate with AI."
                  }
                ].map((review, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{review.name}</h4>
                        <p className="text-sm text-primary">{review.role}</p>
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

export default PracticalSkills;