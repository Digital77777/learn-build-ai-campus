import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface ToolCardProps {
  id: number;
  name: string;
  description: string;
  icon: LucideIcon;
  category: string;
  features: string[];
  pricing: string;
  gradient: string;
  onTryTool: () => void;
  onLearnMore: () => void;
}

export const ToolCard = ({
  name,
  description,
  icon: Icon,
  category,
  features,
  pricing,
  gradient,
  onTryTool,
  onLearnMore
}: ToolCardProps) => {
  return (
    <Card className="group hover:shadow-ai transition-all duration-300 border-border/50 overflow-hidden">
      <CardHeader className="pb-4">
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white mb-4`}>
          <Icon className="h-8 w-8" />
        </div>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          <Badge variant={pricing === "Free" ? "default" : "outline"} className="text-xs">
            {pricing}
          </Badge>
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          {name}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Key Features:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button className="flex-1 group/btn" onClick={onTryTool}>
            Try Now
            <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="sm" onClick={onLearnMore}>
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
