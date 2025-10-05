import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Navigation from "./components/Navigation";
import MobileFooter from "./components/MobileFooter";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import LearningPaths from "./pages/LearningPaths";
import AIToolsPage from "./pages/AIToolsPage";
import MarketplacePage from "./pages/MarketplacePage";
import StartSellingPage from "./pages/StartSellingPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import CourseDetail from "./pages/CourseDetail";
import BrowseMarketplacePage from "./pages/BrowseMarketplacePage";
import SellProductsPage from "./pages/SellProductsPage";
import FreelanceServicesPage from "./pages/FreelanceServicesPage";
import PostJobsPage from "./pages/PostJobsPage";
import AIDevelopmentPage from "./pages/AIDevelopmentPage";
import CreateListingPage from "./pages/CreateListingPage";
import EditListingPage from "./pages/EditListingPage";
import MyListingsPage from "./pages/MyListingsPage";
import AICodeAssistant from "./pages/tools/AICodeAssistant";
import NeuralImageGenerator from "./pages/tools/NeuralImageGenerator";
import SmartAnalytics from "./pages/tools/SmartAnalytics";
import ConversationalAI from "./pages/tools/ConversationalAI";
import AIResearchLab from "./pages/tools/AIResearchLab";
import AutoMLPlatform from "./pages/tools/AutoMLPlatform";
import AISnapBuilder from "./pages/tools/AISnapBuilder";
import PromptPlayground from "./pages/tools/PromptPlayground";
import Data2App from "./pages/tools/Data2App";
import AITutorLab from "./pages/tools/AITutorLab";
import FoundationPath from "./pages/course/FoundationPath";
import PracticalSkills from "./pages/course/PracticalSkills";
import TechnicalDeveloper from "./pages/course/TechnicalDeveloper";
import BusinessCareers from "./pages/course/BusinessCareers";
import CreateJobPostingPage from "./pages/CreateJobPostingPage";
import CreateFreelancerProfilePage from "./pages/CreateFreelancerProfilePage";
import StartProjectPage from "./pages/StartProjectPage";
import ScheduleConsultationPage from "./pages/ScheduleConsultationPage";
import CommunityPage from "./pages/CommunityPage";
import ReferralPage from "./pages/ReferralPage";

const queryClient = new QueryClient();

// Component to handle scroll to top and prevent volume button navigation
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    // Prevent volume buttons from triggering navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'VolumeUp' || e.key === 'VolumeDown' || e.key === 'VolumeMute') {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => document.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, []);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background pb-16 md:pb-0">
            <ScrollToTop />
            <Navigation />
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
            <Route path="/tools/ai-code-assistant" element={<AICodeAssistant />} />
            <Route path="/tools/neural-image-generator" element={<NeuralImageGenerator />} />
            <Route path="/tools/smart-analytics" element={<SmartAnalytics />} />
            <Route path="/tools/conversational-ai" element={<ConversationalAI />} />
            <Route path="/tools/ai-research-lab" element={<AIResearchLab />} />
            <Route path="/tools/automl-platform" element={<AutoMLPlatform />} />
            <Route path="/tools/ai-snapbuilder" element={<AISnapBuilder />} />
            <Route path="/tools/prompt-playground" element={<PromptPlayground />} />
            <Route path="/tools/data2app" element={<Data2App />} />
            <Route path="/tools/ai-tutorlab" element={<AITutorLab />} />
            <Route path="/course/foundation-path" element={<FoundationPath />} />
            <Route path="/course/practical-skills" element={<PracticalSkills />} />
            <Route path="/course/technical-developer" element={<TechnicalDeveloper />} />
            <Route path="/course/business-careers" element={<BusinessCareers />} />
            <Route path="/start-selling" element={<StartSellingPage />} />
            <Route path="/course/:courseId" element={<CourseDetail />} />
            <Route path="/marketplace/create-job" element={<CreateJobPostingPage />} />
            <Route path="/marketplace/create-freelancer-profile" element={<CreateFreelancerProfilePage />} />
            <Route path="/marketplace/start-project" element={<StartProjectPage />} />
            <Route path="/marketplace/schedule-consultation" element={<ScheduleConsultationPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/referrals" element={<ReferralPage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/auth" element={<Auth />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <MobileFooter />
        </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
