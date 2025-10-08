import { LucideIcon } from 'lucide-react';

interface FeatureHighlightProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const FeatureHighlight = ({ title, description, icon: Icon }: FeatureHighlightProps) => {
  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
