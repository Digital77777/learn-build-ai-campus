import { Check } from 'lucide-react';

interface BenefitsListProps {
  benefits: string[];
  columns?: 1 | 2 | 3;
}

export const BenefitsList = ({ benefits, columns = 2 }: BenefitsListProps) => {
  const gridCols = columns === 1 ? 'grid-cols-1' : columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  
  return (
    <div className={`grid ${gridCols} gap-4 mb-8`}>
      {benefits.map((benefit, index) => (
        <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
          <div className="flex-shrink-0 mt-0.5">
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="h-4 w-4 text-primary" />
            </div>
          </div>
          <p className="text-sm text-foreground">{benefit}</p>
        </div>
      ))}
    </div>
  );
};
