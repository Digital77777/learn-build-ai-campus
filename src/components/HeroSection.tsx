import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Brain, Sparkles, Users, Trophy, ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Education Platform</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Learn, Build & 
                <span className="block mt-2 bg-gradient-ai bg-clip-text text-transparent">
                  Earn with AI
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Transform your future with hands-on AI education. Build real projects, 
                master cutting-edge tools, and unlock earning opportunities—all while you learn.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-3">
              {[
                "100% Free Access to Premium AI Tools",
                "4 Comprehensive Learning Paths",
                "Real Projects & Certifications"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground/90">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="group text-lg px-8"
                onClick={() => navigate('/learning-paths')}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Start Learning Free
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8"
                onClick={() => navigate('/ai-tools')}
              >
                <Brain className="h-5 w-5 mr-2" />
                Explore AI Tools
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/40">
              <div>
                <div className="text-3xl font-bold bg-gradient-ai bg-clip-text text-transparent">300+</div>
                <div className="text-sm text-muted-foreground mt-1">Active Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-ai bg-clip-text text-transparent">6</div>
                <div className="text-sm text-muted-foreground mt-1">AI Tools</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-ai bg-clip-text text-transparent">$50K+</div>
                <div className="text-sm text-muted-foreground mt-1">Earned</div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual Element */}
          <div className="relative lg:block hidden animate-fade-in">
            {/* Main Image Container */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-ai opacity-20 blur-3xl rounded-full" />
              <div className="relative rounded-3xl overflow-hidden shadow-ai border border-primary/10">
                <img 
                  src="/hero-ai-education-optimized.jpg" 
                  alt="Students learning with AI tools" 
                  className="w-full h-[600px] object-cover"
                  width="1792" 
                  height="1024" 
                  fetchPriority="high" 
                  loading="eager" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
              </div>
            </div>
            
            {/* Floating Achievement Cards */}
            <Card className="absolute top-12 -left-8 bg-background/95 backdrop-blur-xl shadow-ai border-primary/20 animate-fade-in">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-learning rounded-xl">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">300+</div>
                    <div className="text-xs text-muted-foreground">Active Learners</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="absolute bottom-12 -right-8 bg-background/95 backdrop-blur-xl shadow-ai border-primary/20 animate-fade-in">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-earn rounded-xl">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">$50K+</div>
                    <div className="text-xs text-muted-foreground">Total Earnings</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Decorative Elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;