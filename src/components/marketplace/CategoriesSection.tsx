import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Store, Briefcase, Users, Code } from "lucide-react";

const CategoriesSection = ({ categories }: { categories: any[] }) => {
  const icons: { [key: string]: React.ComponentType<any> } = {
    Store,
    Briefcase,
    Users,
    Code,
  };

  const renderIcon = (iconName: string) => {
    const Icon = icons[iconName];
    return Icon ? <Icon className="h-8 w-8" /> : null;
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Marketplace Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover opportunities to monetize your AI skills and connect with the global AI community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Card key={category.id} className="group hover:shadow-ai transition-all duration-300 border-border/50">
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${category.gradient} flex items-center justify-center text-white mb-4`}>
                  {renderIcon(category.icon)}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {category.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs font-bold text-success">
                    {category.feature}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {category.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {category.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <Button className="w-full group/btn">
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
