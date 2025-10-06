import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  variant?: 'default' | 'premium' | 'highlighted';
}

export const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  buttonText, 
  onClick,
  variant = 'default' 
}: FeatureCardProps) => {
  const getCardClasses = () => {
    switch (variant) {
      case 'premium':
        return 'hover:shadow-ai transition-all duration-300 cursor-pointer border-primary/20 hover:border-primary/50 hover:scale-105';
      case 'highlighted':
        return 'hover:shadow-ai transition-all duration-300 cursor-pointer bg-gradient-to-br from-primary/5 to-accent/5 border-primary/30 hover:scale-105';
      default:
        return 'hover:shadow-soft transition-all duration-300 cursor-pointer hover:scale-105';
    }
  };

  return (
    <Card className={getCardClasses()} onClick={onClick}>
      <CardHeader>
        <div className="mb-3">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" variant={variant === 'premium' ? 'default' : 'outline'}>
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};
