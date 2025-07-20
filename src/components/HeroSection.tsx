import HeroContent from "@/components/hero/HeroContent";
import HeroStats from "@/components/hero/HeroStats";
import HeroImage from "@/components/hero/HeroImage";

const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/20 to-primary/10" />
      
      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <HeroContent />
            <HeroStats />
          </div>

          {/* Right Content - Hero Image */}
          <HeroImage />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;