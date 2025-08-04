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
import CreateListingPage from "./pages/CreateListingPage";
import EditListingPage from "./pages/EditListingPage";
import MyListingsPage from "./pages/MyListingsPage";
import { default as AICodeAssistantWithBoundary } from "./pages/tools/AICodeAssistant";
import { default as NeuralImageGeneratorWithBoundary } from "./pages/tools/NeuralImageGenerator";
import { default as SmartAnalyticsWithBoundary } from "./pages/tools/SmartAnalytics";
import { default as ConversationalAIWithBoundary } from "./pages/tools/ConversationalAI";
import { default as AIResearchLabWithBoundary } from "./pages/tools/AIResearchLab";
import { default as AutoMLPlatformWithBoundary } from "./pages/tools/AutoMLPlatform";

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
            <Route path="/marketplace/create" element={<CreateListingPage />} />
            <Route path="/marketplace/edit/:id" element={<EditListingPage />} />
            <Route path="/marketplace/my-listings" element={<MyListingsPage />} />
            <Route path="/tools/ai-code-assistant" element={<AICodeAssistantWithBoundary />} />
            <Route path="/tools/neural-image-generator" element={<NeuralImageGeneratorWithBoundary />} />
            <Route path="/tools/smart-analytics" element={<SmartAnalyticsWithBoundary />} />
            <Route path="/tools/conversational-ai" element={<ConversationalAIWithBoundary />} />
            <Route path="/tools/ai-research-lab" element={<AIResearchLabWithBoundary />} />
            <Route path="/tools/automl-platform" element={<AutoMLPlatformWithBoundary />} />
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
