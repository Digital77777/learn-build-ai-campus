
import { DivideIcon as LucideIcon } from "lucide-react";

export interface AITool {
  id: number;
  name: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: AIToolCategory;
  features: string[];
  pricing: PricingTier;
  usage: string;
  gradient: GradientVariant;
  route?: string;
}

export type AIToolCategory = 
  | "Development" 
  | "Creative" 
  | "Analytics" 
  | "Communication" 
  | "Research" 
  | "Machine Learning";

export type PricingTier = 
  | "Free" 
  | "Premium" 
  | "Pro" 
  | "Enterprise" 
  | "Academic";

export type GradientVariant = 
  | "bg-gradient-learning"
  | "bg-gradient-ai" 
  | "bg-gradient-earn"
  | "from-blue-500 to-cyan-500"
  | "from-purple-500 to-pink-500"
  | "from-emerald-500 to-teal-500"
  | "from-orange-500 to-red-500"
  | "from-indigo-500 to-purple-500"
  | "from-yellow-500 to-orange-500";

export interface AIToolsPageProps {
  tools?: AITool[];
  categories?: string[];
  selectedCategory?: AIToolCategory | "All";
  onCategoryChange?: (category: AIToolCategory | "All") => void;
}

export interface AIToolCardProps {
  tool: AITool;
  onTryNow?: (toolId: number) => void;
  onLearnMore?: (toolId: number) => void;
}

export interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export interface FeatureHighlight {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface AIToolsHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  onTryToolsFree?: () => void;
  onViewPricing?: () => void;
}
