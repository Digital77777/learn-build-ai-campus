import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Trophy, ArrowRight, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTier } from "@/contexts/TierContext";

const learningPaths = [
  // Tier 1 Paths
  {
    id: "foundation-path",
    title: "AI Basics for Everyone",
    description: "Foundation path covering AI fundamentals, mathematics, Python programming, and industry applications",
    duration: "8-12 weeks",
    students: "3,241",
    level: "Beginner",
    earnings: "$500-1,500",
    modules: ["Introduction to AI", "Mathematics for AI", "Python Programming", "AI in Industries"],
    gradient: "bg-gradient-learning",
    tier: 1,
    tierName: "Starter"
  },
  {
    id: "practical-skills",
    title: "From Zero to Builder",
    description: "Practical AI skills including prompt engineering, AI tools, no-code platforms, and data handling",
    duration: "10-14 weeks", 
    students: "2,847",
    level: "Beginner",
    earnings: "$1,000-2,500",
    modules: ["Prompt Engineering", "Using AI Tools", "No-Code AI Building", "Data Handling"],
    gradient: "bg-gradient-ai",
    tier: 1,
    tierName: "Starter"
  },
  // Tier 2 Paths
  {
    id: "ai-product-design",
    title: "Designing Human-Centered AI",
    description: "Learn to design AI apps and tools that people love using with UX principles and human-AI interaction",
    duration: "14-18 weeks",
    students: "1,245",
    level: "Advanced",
    earnings: "$3,000-6,000",
    modules: ["AI UX Design", "Conversational Interfaces", "Visual Design", "User Testing", "Human-AI Interaction"],
    gradient: "bg-gradient-ai",
    tier: 2,
    tierName: "Creator"
  },
  {
    id: "ai-entrepreneurship",
    title: "From Student to Founder",
    description: "Train to launch and lead AI-driven ventures with startup fundamentals and leadership skills",
    duration: "14-18 weeks",
    students: "987",
    level: "Advanced",
    earnings: "$5,000-15,000",
    modules: ["Startup Fundamentals", "Team Leadership", "Pitching", "Revenue Models", "Business Planning"],
    gradient: "bg-gradient-earn",
    tier: 2,
    tierName: "Creator"
  },
  {
    id: "applied-ai-industry",
    title: "AI Specialist Tracks",
    description: "Specialize in AI applications for healthcare, finance, or education with industry-specific projects",
    duration: "16-20 weeks",
    students: "1,432",
    level: "Advanced",
    earnings: "$4,000-8,000",
    modules: ["Healthcare AI", "Finance AI", "Education AI", "Industry Applications", "Capstone Projects"],
    gradient: "bg-gradient-learning",
    tier: 2,
    tierName: "Creator"
  },
  {
    id: "responsible-ai",
    title: "Building AI for Good",
    description: "Handle AI bias, safety, and regulation with ethics, fairness, and policy frameworks",
    duration: "12-16 weeks",
    students: "1,156",
    level: "Advanced",
    earnings: "$3,500-7,000",
    modules: ["AI Ethics", "Fairness", "Policy & Regulation", "Responsible Data", "Governance"],
    gradient: "bg-gradient-ai",
    tier: 2,
    tierName: "Creator"
  },
  {
    id: "advanced-technical-ai",
    title: "AI Research & Innovation",
    description: "Go beyond using tools into AI research and innovation with advanced ML and cutting-edge research",
    duration: "18-22 weeks",
    students: "876",
    level: "Advanced",
    earnings: "$5,000-10,000",
    modules: ["Advanced ML", "Reinforcement Learning", "LLMs", "Multimodal AI", "Research Methods"],
    gradient: "bg-gradient-earn",
    tier: 2,
    tierName: "Creator"
  },
  // Tier 3 Paths
  {
    id: "technical-developer",
    title: "Future AI Engineer",
    description: "Technical development path covering machine learning, deep learning, NLP, and computer vision",
    duration: "16-20 weeks",
    students: "1,834",
    level: "Professional",
    earnings: "$6,000-12,000",
    modules: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Model Deployment"],
    gradient: "bg-gradient-earn",
    tier: 3,
    tierName: "Career"
  },
  {
    id: "business-careers",
    title: "AI for Work & Startups",
    description: "Business-focused path covering productivity, marketing, product management, and entrepreneurship",
    duration: "12-16 weeks",
    students: "1,487",
    level: "Professional",
    earnings: "$4,500-9,000",
    modules: ["AI for Business", "AI Marketing", "Product Management", "Freelancing", "Building Startups"],
    gradient: "bg-gradient-learning",
    tier: 3,
    tierName: "Career"
  }
];

// Memoized path card component
const PathCard = memo(({ path, isLocked, onNavigate }: { path: typeof learningPaths[0]; isLocked: boolean; onNavigate: (id: string) => void }) => (
  <div className="relative">
    <Card className={`transition-all duration-300 ${isLocked ? 'opacity-60' : 'hover:shadow-ai hover:-translate-y-1'}`}>
      <CardHeader className="p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Badge variant="secondary" className="text-xs">{path.level}</Badge>
            <CardTitle className="text-lg sm:text-xl">{path.title}</CardTitle>
          </div>
          <div className={`p-2 sm:p-3 rounded-lg ${path.gradient}`}>
            <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">{path.description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
          <div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1 text-muted-foreground">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">{path.duration}</span>
            </div>
          </div>
          <div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1 text-muted-foreground">
              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">{path.students}</span>
            </div>
          </div>
          <div>
            <div className="text-xs sm:text-sm font-semibold text-success">{path.earnings}</div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">Potential</div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Key Modules:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
            {path.modules.map((module, idx) => (
              <div key={idx} className="text-xs sm:text-sm text-muted-foreground bg-background p-1.5 sm:p-2 rounded">
                {module}
              </div>
            ))}
          </div>
        </div>

        <Button 
          className="w-full group text-sm" 
          variant="default"
          onClick={() => onNavigate(path.id)}
          disabled={isLocked}
        >
          {isLocked ? (
            <>
              <Lock className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Locked
            </>
          ) : (
            <>
              Start Learning Path
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
    
    {/* Lock Overlay for locked paths */}
    {isLocked && (
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center gap-2 sm:gap-3 p-4 sm:p-6">
        <Lock className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
        <div className="text-center">
          <p className="font-semibold text-sm sm:text-base mb-1">
            {path.tierName} Tier Required
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
            Upgrade to access this path
          </p>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onNavigate("/subscription" as any);
            }}
            className="w-full sm:w-auto text-xs sm:text-sm"
          >
            Upgrade Now
          </Button>
        </div>
      </div>
    )}
  </div>
));

PathCard.displayName = 'PathCard';

const LearningPaths = () => {
  const navigate = useNavigate();
  const { tierName } = useTier();
  
  // Determine user's tier level
  const getTierLevel = () => {
    if (tierName === "starter") return 1;
    if (tierName === "creator") return 2;
    if (tierName === "career") return 3;
    return 1;
  };

  const userTierLevel = getTierLevel();
  
  const handleNavigate = (id: string) => {
    if (id === "/subscription") {
      navigate("/subscription");
    } else {
      const path = learningPaths.find(p => p.id === id);
      if (path && path.tier > userTierLevel) {
        navigate("/subscription");
      } else {
        navigate(`/course/${id}`);
      }
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Learning Paths</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
            Structured paths from beginner to professional - {tierName === "starter" ? "Starter" : tierName === "creator" ? "Creator & Starter" : "All tiers"} available
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {learningPaths.map((path) => (
            <PathCard 
              key={path.id} 
              path={path} 
              isLocked={path.tier > userTierLevel}
              onNavigate={handleNavigate} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPaths;