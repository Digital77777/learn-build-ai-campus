import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { TierProvider } from "@/contexts/TierContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Navigation from "./components/Navigation";
import MobileFooter from "./components/MobileFooter";
import { LoadingScreen } from "./components/LoadingScreen";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const ToolsRoutes = React.lazy(() => import("./routes/ToolsRoutes"));
const CourseRoutes = React.lazy(() => import("./routes/CourseRoutes"));
const MarketplaceRoutes = React.lazy(() => import("./routes/MarketplaceRoutes"));
const CommunityRoutes = React.lazy(() => import("./routes/CommunityRoutes"));
const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TierProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen bg-background pb-16 md:pb-0">
                <Navigation />
                <Suspense fallback={<LoadingScreen />}> 
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth/*" element={<Auth />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/tools/*" element={<ToolsRoutes />} />
                    <Route path="/courses/*" element={<CourseRoutes />} />
                    <Route path="/marketplace/*" element={<MarketplaceRoutes />} />
                    <Route path="/community/*" element={<CommunityRoutes />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
                <MobileFooter />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </TierProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;