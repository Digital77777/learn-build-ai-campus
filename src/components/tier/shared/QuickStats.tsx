import { Card } from '@/components/ui/card';

interface Stat {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface QuickStatsProps {
  stats: Stat[];
}

export const QuickStats = ({ stats }: QuickStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 text-center hover:shadow-soft transition-shadow">
          {stat.icon && (
            <div className="flex justify-center mb-3">
              {stat.icon}
            </div>
          )}
          <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
            {stat.value}
          </div>
          <div className="text-sm text-muted-foreground">
            {stat.label}
          </div>
        </Card>
      ))}
    </div>
  );
};
