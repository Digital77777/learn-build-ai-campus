import { Link } from "react-router-dom";
import { Store, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-20 pb-16">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-success/10 rounded-full">
          <Store className="h-4 w-4 text-success" />
          <span className="text-sm font-medium text-success">AI Marketplace</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-earn bg-clip-text text-transparent">
            AI Marketplace
          </span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Buy, sell, and hire in the world's largest AI marketplace. Connect with experts, showcase your skills, and grow your business
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/sell">
            <Button size="lg" className="bg-gradient-earn text-white hover:opacity-90">
              <Store className="h-5 w-5 mr-2" />
              Start Selling
            </Button>
          </Link>
          <Button size="lg" variant="outline">
            Browse Marketplace
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
