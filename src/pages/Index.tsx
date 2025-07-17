import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import LearningPaths from "@/components/LearningPaths";
import AITools from "@/components/AITools";
import EarningsSection from "@/components/EarningsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <LearningPaths />
      <AITools />
      <EarningsSection />
      <Footer />
    </div>
  );
};

export default Index;
