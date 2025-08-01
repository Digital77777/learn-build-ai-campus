import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import LearningPaths from "./pages/LearningPaths";
import AIToolsPage from "./pages/AIToolsPage";
import MarketplacePage from "./pages/MarketplacePage";
import StartSellingPage from "./pages/StartSellingPage";
import CourseDetail from "./pages/CourseDetail";
import BrowseMarketplacePage from "./pages/BrowseMarketplacePage";
import SellProductsPage from "./pages/SellProductsPage";
import FreelanceServicesPage from "./pages/FreelanceServicesPage";
import PostJobsPage from "./pages/PostJobsPage";
import AIDevelopmentPage from "./pages/AIDevelopmentPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/learning-paths" element={<LearningPaths />} />
            <Route path="/ai-tools" element={<AIToolsPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/marketplace/browse" element={<BrowseMarketplacePage />} />
            <Route path="/marketplace/sell-products" element={<SellProductsPage />} />
            <Route path="/marketplace/freelance-services" element={<FreelanceServicesPage />} />
            <Route path="/marketplace/post-jobs" element={<PostJobsPage />} />
            <Route path="/marketplace/ai-development" element={<AIDevelopmentPage />} />
            <Route path="/start-selling" element={<StartSellingPage />} />
            <Route path="/course/:courseId" element={<CourseDetail />} />
            <Route path="/auth" element={<Auth />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
