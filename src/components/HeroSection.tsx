import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Brain, Users, Trophy, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-6 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">AI-Powered Learning Platform</span>
              </div>
              
              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                  Learn, Build & 
                  <span className="block mt-2 bg-gradient-ai bg-clip-text text-transparent">
                    Earn with AI
                  </span>
                </h1>
                
                {/* Mission Statement */}
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Master artificial intelligence through hands-on learning paths, 
                  build real projects with embedded AI tools, and create income 
                  opportunities while studying.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="space-y-3">
                {[
                  'Free access to premium AI tools',
                  'Learn at your own pace with expert-led courses',
                  'Build real-world projects for your portfolio'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground group h-14 px-8 text-base"
                  onClick={() => navigate('/learning-paths')}
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Start Learning Free
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="h-14 px-8 text-base border-2"
                  onClick={() => navigate('/ai-tools')}
                >
                  <Brain className="h-5 w-5 mr-2" />
                  Explore AI Tools
                </Button>
              </div>

              {/* Stats - More refined */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
                <div>
                  <div className="text-4xl font-bold bg-gradient-ai bg-clip-text text-transparent">6</div>
                  <div className="text-sm text-muted-foreground mt-1">AI Tools</div>
                </div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-ai bg-clip-text text-transparent">4</div>
                  <div className="text-sm text-muted-foreground mt-1">Learning Paths</div>
                </div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-ai bg-clip-text text-transparent">100%</div>
                  <div className="text-sm text-muted-foreground mt-1">Free Access</div>
                </div>
              </div>
            </div>

            {/* Right Content - Enhanced Image Display */}
            <div className="relative lg:h-[600px]">
              {/* Main image container with refined shadow */}
              <div className="relative rounded-3xl overflow-hidden border border-border/50 h-full">
                <img 
                  src="/hero-ai-education-optimized.jpg" 
                  alt="Students learning with AI tools" 
                  className="w-full h-full object-cover"
                  width="1792" 
                  height="1024" 
                  fetchPriority="high" 
                  loading="eager" 
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent" />
              </div>
              
              {/* Floating Stats Cards - More professional */}
              <Card className="absolute top-8 -left-6 bg-background/95 backdrop-blur-xl border-border/50 shadow-xl">
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-learning rounded-xl">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">300+</div>
                      <div className="text-sm text-muted-foreground">Active Students</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="absolute bottom-8 -right-6 bg-background/95 backdrop-blur-xl border-border/50 shadow-xl">
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-earn rounded-xl">
                      <Trophy className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">$50K+</div>
                      <div className="text-sm text-muted-foreground">Student Earnings</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;