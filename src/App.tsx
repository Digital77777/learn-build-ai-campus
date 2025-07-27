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
import CourseDetail from "./pages/CourseDetail";
import SellPage from "./pages/SellPage";
import ListingDetailPage from "./pages/ListingDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";

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
            <Route path="/listing/:id" element={<ListingDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/course/:courseId" element={<CourseDetail />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/sell" element={<SellPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
