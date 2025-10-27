import React, { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { TierProvider } from "@/contexts/TierContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Navigation from "./components/Navigation";
import MobileFooter from "./components/MobileFooter";
import { LoadingScreen } from "./components/LoadingScreen";

// Eager load critical pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Lazy load remaining pages for better performance
const LearningPaths = lazy(() => import("./pages/LearningPaths"));
const AIToolsPage = lazy(() => import("./pages/AIToolsPage"));
const MarketplacePage = lazy(() => import("./pages/MarketplacePage"));
const StartSellingPage = lazy(() => import("./pages/StartSellingPage"));
const SubscriptionPage = lazy(() => import("./pages/SubscriptionPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const BrowseMarketplacePage = lazy(() => import("./pages/BrowseMarketplacePage"));
const SellProductsPage = lazy(() => import("./pages/SellProductsPage"));
const FreelanceServicesPage = lazy(() => import("./pages/FreelanceServicesPage"));
const PostJobsPage = lazy(() => import("./pages/PostJobsPage"));
const AIDevelopmentPage = lazy(() => import("./pages/AIDevelopmentPage"));
const CreateListingPage = lazy(() => import("./pages/CreateListingPage"));
const EditListingPage = lazy(() => import("./pages/EditListingPage"));
const MyListingsPage = lazy(() => import("./pages/MyListingsPage"));
const AICodeAssistant = lazy(() => import("./pages/tools/AICodeAssistant"));
const NeuralImageGenerator = lazy(() => import("./pages/tools/NeuralImageGenerator"));
const SmartAnalytics = lazy(() => import("./pages/tools/SmartAnalytics"));
const ConversationalAI = lazy(() => import("./pages/tools/ConversationalAI"));
const AIResearchLab = lazy(() => import("./pages/tools/AIResearchLab"));
const AutoMLPlatform = lazy(() => import("./pages/tools/AutoMLPlatform"));
const AISnapBuilder = lazy(() => import("./pages/tools/AISnapBuilder"));
const PromptPlayground = lazy(() => import("./pages/tools/PromptPlayground"));
const Data2App = lazy(() => import("./pages/tools/Data2App"));
const AITutorLab = lazy(() => import("./pages/tools/AITutorLab"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const StrategySessionsPage = lazy(() => import("./pages/StrategySessionsPage"));
const CreatorSuitePage = lazy(() => import("./pages/CreatorSuitePage"));
const FoundationPath = lazy(() => import("./pages/course/FoundationPath"));
const PracticalSkills = lazy(() => import("./pages/course/PracticalSkills"));
const TechnicalDeveloper = lazy(() => import("./pages/course/TechnicalDeveloper"));
const BusinessCareers = lazy(() => import("./pages/course/BusinessCareers"));
const CreateJobPostingPage = lazy(() => import("./pages/CreateJobPostingPage"));
const CreateFreelancerProfilePage = lazy(() => import("./pages/CreateFreelancerProfilePage"));
const StartProjectPage = lazy(() => import("./pages/StartProjectPage"));
const ScheduleConsultationPage = lazy(() => import("./pages/ScheduleConsultationPage"));
const CommunityPage = lazy(() => import("./pages/CommunityPage"));
const MyActivityPage = lazy(() => import("./pages/MyActivityPage"));
const TopicDetailPage = lazy(() => import("./pages/community/TopicDetailPage"));
const StartTopicPage = lazy(() => import("./pages/community/StartTopicPage"));
const BrowseEventsPage = lazy(() => import("./pages/community/BrowseEventsPage"));
const HostEventPage = lazy(() => import("./pages/community/HostEventPage"));
const ShareInsightPage = lazy(() => import("./pages/community/ShareInsightPage"));
const FindMembersPage = lazy(() => import("./pages/community/FindMembersPage"));
const ReferralPage = lazy(() => import("./pages/ReferralPage"));

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
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TierProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
          <div className="min-h-screen bg-background pb-16 md:pb-0">
            <ScrollToTop />
            <Navigation />
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<DashboardPage />} />
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
                <Route path="/community/my-activity" element={<MyActivityPage />} />
                <Route path="/community/topic/:topicId" element={<TopicDetailPage />} />
                <Route path="/community/start-topic" element={<StartTopicPage />} />
                <Route path="/community/browse-events" element={<BrowseEventsPage />} />
                <Route path="/community/host-event" element={<HostEventPage />} />
                <Route path="/community/share-insight" element={<ShareInsightPage />} />
                <Route path="/community/find-members" element={<FindMembersPage />} />
                <Route path="/referrals" element={<ReferralPage />} />
                <Route path="/subscription" element={<SubscriptionPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/strategy-sessions" element={<StrategySessionsPage />} />
                <Route path="/creator-suite" element={<CreatorSuitePage />} />
                <Route path="/auth" element={<Auth />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
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
