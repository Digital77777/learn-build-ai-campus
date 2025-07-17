import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Brain, Coins, Zap, Users, Trophy } from "lucide-react";
import heroImage from "@/assets/hero-ai-education.jpg";

const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/20 to-primary/10" />
      
      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full">
                <Zap className="h-4 w-4 text-accent-foreground" />
                <span className="text-sm font-medium text-accent-foreground">Free for University Students</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Learn, Build & 
                <span className="bg-gradient-ai bg-clip-text text-transparent"> Earn</span>
                <br />with AI
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Master artificial intelligence through hands-on learning paths, 
                build real projects with embedded AI tools, and create income 
                opportunities while studying.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Start Learning Free
              </Button>
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Explore AI Tools
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5</div>
                <div className="text-sm text-muted-foreground">AI Tools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">Learning Paths</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Free Access</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-ai">
              <img 
                src={heroImage} 
                alt="Students learning with AI tools"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating Cards */}
            <Card className="absolute -top-4 -left-4 bg-background/95 backdrop-blur shadow-soft">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-learning rounded-lg">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">5,000+</div>
                    <div className="text-sm text-muted-foreground">Active Students</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="absolute -bottom-4 -right-4 bg-background/95 backdrop-blur shadow-soft">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-earn rounded-lg">
                    <Trophy className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">$50K+</div>
                    <div className="text-sm text-muted-foreground">Student Earnings</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;