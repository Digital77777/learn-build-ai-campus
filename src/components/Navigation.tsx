import { BookOpen, Brain, Coins, Home, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-ai bg-clip-text text-transparent">
              Digital Intelligence Marketplace
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Home
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Learning Paths
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Tools
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Coins className="h-4 w-4" />
              Earn
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button variant="ai" size="sm">
              Get Started Free
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;