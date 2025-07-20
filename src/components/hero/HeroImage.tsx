import { Card, CardContent } from "@/components/ui/card";
import { Users, Trophy } from "lucide-react";
import heroImage from "@/assets/hero-ai-professional.jpg";

const HeroImage = () => {
  return (
    <div className="relative">
      <div className="relative rounded-2xl overflow-hidden shadow-ai">
        <img 
          src={heroImage} 
          alt="Professionals learning AI and data science"
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
  );
};

export default HeroImage;