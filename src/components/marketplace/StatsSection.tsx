import { DollarSign, Briefcase, TrendingUp, Store } from "lucide-react";

const StatsSection = ({ stats }: { stats: any[] }) => {
  const icons: { [key: string]: React.ComponentType<any> } = {
    Store,
    DollarSign,
    Briefcase,
    TrendingUp,
  };

  const renderStatIcon = (iconName: string) => {
    const Icon = icons[iconName];
    return Icon ? <Icon className="h-5 w-5" /> : null;
  };

  return (
    <section className="py-12 border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="text-primary">{renderStatIcon(stat.icon)}</div>
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
