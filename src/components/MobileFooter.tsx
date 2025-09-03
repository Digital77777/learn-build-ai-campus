import { Home, BookOpen, Brain, Store, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const MobileFooter = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const navigationItems = [
    {
      icon: Home,
      label: "Home",
      path: "/"
    },
    {
      icon: BookOpen,
      label: "Learning",
      path: "/learning-paths"
    },
    {
      icon: Brain,
      label: "AI Tools",
      path: "/ai-tools"
    },
    {
      icon: Store,
      label: "Market",
      path: "/marketplace"
    },
    {
      icon: Users,
      label: "Community",
      path: "/community"
    }
  ];

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 border-t border-border">
      <div className="flex items-center justify-around py-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors min-w-0 flex-1",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <item.icon className={cn("h-5 w-5 mb-1", isActive && "text-primary")} />
              <span className={cn(
                "text-xs font-medium truncate",
                isActive && "text-primary"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default MobileFooter;