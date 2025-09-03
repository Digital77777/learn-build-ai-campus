import { BookOpen, Brain, Store, Home, User, LogOut, Menu, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const {
    user,
    signOut,
    loading
  } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigationItems = [{
    icon: Home,
    label: "Home",
    path: "/"
  }, {
    icon: BookOpen,
    label: "Learning Paths",
    path: "/learning-paths"
  }, {
    icon: Brain,
    label: "AI Tools",
    path: "/ai-tools"
  }, {
    icon: Store,
    label: "Marketplace",
    path: "/marketplace"
  }, {
    icon: Users,
    label: "Community",
    path: "/community"
  }];
  return <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-ai bg-clip-text text-transparent">
              Digital Intelligence Marketplace
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {navigationItems.map(item => <Link key={item.path} to={item.path}>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>)}
          </div>

          <div className="flex items-center space-x-3">
            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center space-x-2">
                      <Brain className="h-6 w-6 text-primary" />
                      <span className="font-bold text-sm bg-gradient-ai bg-clip-text text-transparent">
                        Digital Intelligence
                      </span>
                    </div>
                  </div>
                  
                  <ScrollArea className="flex-1 px-4">
                    <div className="py-6 space-y-2">
                      {navigationItems.map(item => <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start gap-3 h-12 px-4 text-left">
                            <item.icon className="h-5 w-5" />
                            <span className="font-medium">{item.label}</span>
                          </Button>
                        </Link>)}
                    </div>
                    
                    {/* Mobile User Section */}
                    <div className="py-4 border-t border-border">
                      {loading ? <div className="px-4">
                          <div className="w-full h-12 animate-pulse bg-muted rounded" />
                        </div> : user ? <div className="px-4 space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <User className="h-5 w-5 text-muted-foreground" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{user.email}</p>
                              <p className="text-xs text-muted-foreground">Student Account</p>
                            </div>
                          </div>
                          <Button variant="outline" onClick={() => {
                        signOut();
                        setIsMobileMenuOpen(false);
                      }} className="w-full justify-start gap-3">
                            <LogOut className="h-4 w-4" />
                            Log out
                          </Button>
                        </div> : <div className="px-4 space-y-3">
                          <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button variant="outline" className="w-full">
                              Sign In
                            </Button>
                          </Link>
                          <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button className="w-full bg-gradient-ai text-white">
                              Get Started Free
                            </Button>
                          </Link>
                        </div>}
                    </div>
                  </ScrollArea>
                </div>
              </SheetContent>
            </Sheet>
            {loading ? <div className="w-20 h-8 animate-pulse bg-muted rounded" /> : user ? <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">{user.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Student Account
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/marketplace/my-listings">My Listings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/marketplace/create">Create Listing</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> : <>
                <Link to="/auth">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="ai" size="sm" className="mx-0 px-0 py-[2px] my-[10px]">
                    Get Started Free
                  </Button>
                </Link>
              </>}
          </div>
        </div>
      </div>
    </nav>;
};
export default Navigation;