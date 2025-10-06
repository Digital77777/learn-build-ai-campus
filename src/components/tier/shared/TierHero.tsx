import { ReactNode } from 'react';

interface TierHeroProps {
  title: string;
  subtitle: string;
  icon?: ReactNode;
  gradient?: 'ai' | 'learning' | 'earn';
}

export const TierHero = ({ title, subtitle, icon, gradient = 'ai' }: TierHeroProps) => {
  return (
    <div className="text-center space-y-4 mb-12">
      {icon && (
        <div className="flex justify-center mb-4">
          {icon}
        </div>
      )}
      <h1 className={`text-4xl md:text-6xl font-bold bg-gradient-${gradient} bg-clip-text text-transparent`}>
        {title}
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
        {subtitle}
      </p>
      <div className="pt-4">
        <p className="text-lg font-semibold text-foreground/80">
          Learn, Build & Earn with AI
        </p>
      </div>
    </div>
  );
};
