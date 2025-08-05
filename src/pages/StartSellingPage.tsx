
import { Store, Briefcase, Users, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const StartSellingPage = () => {
  const sellingOptions = [
    {
      title: "Sell Products",
      description: "Monetize your AI tools, templates, courses, and digital products",
      icon: <Store className="h-8 w-8" />,
      link: "/marketplace/sell-products",
      benefits: ["No listing fees", "Global reach", "Instant payments"]
    },
    {
      title: "Offer Services",
      description: "Freelance your AI expertise and consulting skills",
      icon: <Briefcase className="h-8 w-8" />,
      link: "/marketplace/freelance-services",
      benefits: ["Set your rates", "Flexible schedule", "Quality clients"]
    },
    {
      title: "Post Jobs",
      description: "Hire talented AI professionals for your projects",
      icon: <Users className="h-8 w-8" />,
      link: "/marketplace/post-jobs",
      benefits: ["Verified profiles", "Fast hiring", "Quality guarantee"]
    },
    {
      title: "AI Development",
      description: "Custom AI solutions and enterprise development",
      icon: <Code className="h-8 w-8" />,
      link: "/marketplace/ai-development",
      benefits: ["Enterprise ready", "Expert team", "Full support"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-earn bg-clip-text text-transparent">
              Start Selling on AI Marketplace
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose how you want to monetize your AI expertise and start earning today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {sellingOptions.map((option, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-earn flex items-center justify-center text-white">
                  {option.icon}
                </div>
                <CardTitle className="text-2xl">{option.title}</CardTitle>
                <CardDescription className="text-base">{option.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Benefits:</h4>
                  <ul className="space-y-1">
                    {option.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-success rounded-full" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link to={option.link}>
                  <Button className="w-full" size="lg">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Need help choosing? Our team is here to guide you to the best option for your goals.
          </p>
          <Button variant="outline" size="lg">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartSellingPage;
