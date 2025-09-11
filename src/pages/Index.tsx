import HeroSection from "@/components/HeroSection";
import LearningPaths from "@/components/LearningPaths";
import AITools from "@/components/AITools";
import EarningsSection from "@/components/EarningsSection";
import Footer from "@/components/Footer";
import { WhatsAppReferralButton } from "@/components/WhatsAppReferralButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <LearningPaths />
      <AITools />
      <EarningsSection />
      <Footer />
      <WhatsAppReferralButton />
    </div>
  );
};

export default Index;
