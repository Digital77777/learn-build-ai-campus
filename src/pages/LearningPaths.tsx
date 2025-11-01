
import { BookOpen, Clock, Star, Users, ArrowRight, Play, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useTier } from "@/contexts/TierContext";

const LearningPaths = () => {
  const navigate = useNavigate();
  const { tierName, loading } = useTier();
  
  const paths = [
    {
      id: "foundation-path",
      title: "AI Basics for Everyone",
      description: "Foundation path covering AI fundamentals, mathematics, Python programming, and industry applications",
      duration: "8-12 weeks",
      level: "Beginner",
      students: 3241,
      rating: 4.9,
      image: "🎓",
      lessons: 20,
      skills: ["AI Fundamentals", "Mathematics", "Python", "Industry Applications"],
      tier: 1,
      tierName: "Starter"
    },
    {
      id: "practical-skills",
      title: "From Zero to Builder",
      description: "Practical AI skills including prompt engineering, AI tools, no-code platforms, and data handling",
      duration: "10-14 weeks",
      level: "Beginner",
      students: 2847,
      rating: 4.8,
      image: "🛠️",
      lessons: 24,
      skills: ["Prompt Engineering", "AI Tools", "No-Code Building", "Data Handling"],
      tier: 1,
      tierName: "Starter"
    },
    {
      id: "technical-developer",
      title: "Future AI Engineer",
      description: "Technical development path covering machine learning, deep learning, NLP, and computer vision",
      duration: "16-20 weeks",
      level: "Intermediate",
      students: 1834,
      rating: 4.7,
      image: "⚡",
      lessons: 30,
      skills: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision"],
      tier: 2,
      tierName: "Creator"
    },
    {
      id: "business-careers",
      title: "AI for Work & Startups",
      description: "Business-focused path covering productivity, marketing, product management, and entrepreneurship",
      duration: "12-16 weeks",
      level: "Intermediate",
      students: 1487,
      rating: 4.8,
      image: "🚀",
      lessons: 25,
      skills: ["Business AI", "Marketing", "Product Management", "Entrepreneurship"],
      tier: 3,
      tierName: "Career"
    }
  ];

  // Determine user's tier level
  const getTierLevel = () => {
    if (tierName === 'career') return 3;
    if (tierName === 'creator') return 2;
    return 1; // starter
  };

  const userTierLevel = getTierLevel();

  // Filter paths based on user's tier
  const accessiblePaths = paths.filter(path => path.tier <= userTierLevel);
  const lockedPaths = paths.filter(path => path.tier > userTierLevel);

  const handleNavigate = (pathId: string, isLocked: boolean) => {
    if (isLocked) {
      navigate('/subscription');
    } else {
      navigate(`/course/${pathId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading learning paths...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-ai bg-clip-text text-transparent">
                AI Learning Paths
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed px-4">
              Structured journeys from complete beginner to confident AI builder
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                <span>100+ Lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                <span>5,000+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                <span>4.8 Rating</span>
              </div>
            </div>
            <div className="mt-6 sm:mt-8">
              <Badge variant="secondary" className="text-xs sm:text-sm">
                Your Tier: {tierName?.charAt(0).toUpperCase() + tierName?.slice(1) || 'Starter'} - {accessiblePaths.length} of {paths.length} paths available
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Accessible Learning Paths */}
      {accessiblePaths.length > 0 && (
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Your Learning Paths</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {accessiblePaths.map((path) => (
                <Card key={path.id} className="group hover:shadow-ai transition-all duration-300 border-border/50">
                  <CardHeader className="pb-4 p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-3xl sm:text-4xl mb-4">{path.image}</div>
                      <div className="flex flex-col gap-2 items-end">
                        <Badge variant="secondary" className="text-xs whitespace-nowrap">
                          {path.level}
                        </Badge>
                        <Badge variant="outline" className="text-xs whitespace-nowrap">
                          Tier {path.tier}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg sm:text-xl group-hover:text-primary transition-colors">
                      {path.title}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base text-muted-foreground">
                      {path.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {path.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 text-sm text-muted-foreground">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{path.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{path.lessons} lessons</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{path.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 pt-2">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{path.students.toLocaleString()} students</span>
                      </div>
                      <Button 
                        className="group/btn w-full sm:w-auto"
                        onClick={() => handleNavigate(path.id, false)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Learning
                        <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Locked Learning Paths */}
      {lockedPaths.length > 0 && (
        <section className="py-12 sm:py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Upgrade to Unlock More</h2>
            <p className="text-sm sm:text-base text-muted-foreground text-center mb-6 sm:mb-8 max-w-2xl mx-auto">
              Upgrade your subscription to access advanced learning paths and accelerate your AI journey
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {lockedPaths.map((path) => (
                <Card key={path.id} className="relative overflow-hidden border-border/50 opacity-75">
                  <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] z-10 flex items-center justify-center">
                    <div className="text-center space-y-4 p-4">
                      <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Lock className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2 text-xs sm:text-sm">
                          {path.tierName} Tier Required
                        </Badge>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                          Upgrade to access this path
                        </p>
                        <Button 
                          size="sm"
                          className="w-full sm:w-auto"
                          onClick={() => handleNavigate(path.id, true)}
                        >
                          Upgrade Now
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-4 p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-3xl sm:text-4xl mb-4">{path.image}</div>
                      <div className="flex flex-col gap-2 items-end">
                        <Badge variant="secondary" className="text-xs whitespace-nowrap">
                          {path.level}
                        </Badge>
                        <Badge variant="outline" className="text-xs whitespace-nowrap">
                          Tier {path.tier}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg sm:text-xl">
                      {path.title}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base text-muted-foreground">
                      {path.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {path.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 text-sm text-muted-foreground">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{path.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{path.lessons} lessons</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{path.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to Start Your AI Journey?</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Join thousands of students who are already mastering AI and building the future
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-ai text-white hover:opacity-90 w-full sm:w-auto"
            onClick={() => navigate('/subscription')}
          >
            {userTierLevel < 3 ? 'Upgrade Your Plan' : 'View Subscription'}
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LearningPaths;