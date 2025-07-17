import { Brain, BookOpen, Code, Users, Mail, Twitter, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-lg font-bold bg-gradient-ai bg-clip-text text-transparent">
                Digital Intelligence
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Empowering university students to learn, build, and earn with artificial intelligence.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Learning */}
          <div className="space-y-4">
            <h3 className="font-semibold">Learning</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                AI Fundamentals
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Machine Learning
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Deep Learning
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Computer Vision
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Natural Language Processing
              </a>
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h3 className="font-semibold">AI Tools</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Writing Assistant
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Code Generator
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Research Helper
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Image Creator
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Study Buddy
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Community Forum
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Student Support
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                University Partners
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 Digital Intelligence Marketplace. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Student Agreement
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;