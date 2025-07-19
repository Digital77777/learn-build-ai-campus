import { AITool, FeatureHighlight } from "@/types/aiTools";
import { Code, Image, BarChart3, MessageSquare, Brain, Zap, Sparkles } from "lucide-react";

export const tools: AITool[] = [
  {
    id: 1,
    name: "AI Code Assistant",
    title: "AI Code Assistant",
    description: "Intelligent code completion and debugging powered by advanced language models",
    icon: Code,
    category: "Development",
    features: ["Code completion", "Bug detection", "Refactoring"],
    pricing: "Free",
    usage: "Free unlimited",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    name: "Neural Image Generator",
    title: "Neural Image Generator",
    description: "Create stunning visuals and artwork using state-of-the-art image generation AI",
    icon: Image,
    category: "Creative",
    features: ["Text-to-image", "Style transfer", "Image editing"],
    pricing: "Premium",
    usage: "50 images/day",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    name: "Smart Analytics",
    title: "Smart Analytics",
    description: "Automated data analysis and insights generation for your business metrics",
    icon: BarChart3,
    category: "Analytics",
    features: ["Predictive analytics", "Report generation", "Data visualization"],
    pricing: "Pro",
    usage: "Pro plan",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    id: 4,
    name: "Conversational AI",
    title: "Conversational AI",
    description: "Build intelligent chatbots and virtual assistants for customer support",
    icon: MessageSquare,
    category: "Communication",
    features: ["Natural language", "Multi-language", "Integration APIs"],
    pricing: "Enterprise",
    usage: "Enterprise plan",
    gradient: "from-orange-500 to-red-500"
  },
  {
    id: 5,
    name: "AI Research Lab",
    title: "AI Research Lab",
    description: "Experiment with cutting-edge AI models and research tools",
    icon: Brain,
    category: "Research",
    features: ["Model training", "Experiment tracking", "Collaboration"],
    pricing: "Academic",
    usage: "Academic plan",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    id: 6,
    name: "AutoML Platform",
    title: "AutoML Platform",
    description: "Automated machine learning pipeline for rapid model development",
    icon: Zap,
    category: "Machine Learning",
    features: ["Auto feature engineering", "Model selection", "Deployment"],
    pricing: "Pro",
    usage: "Pro plan",
    gradient: "from-yellow-500 to-orange-500"
  }
];

export const categories: string[] = ["All", "Development", "Creative", "Analytics", "Communication", "Research", "Machine Learning"];

export const featureHighlights: FeatureHighlight[] = [
  {
    title: "Lightning Fast",
    description: "Optimized for speed and efficiency to boost your productivity",
    icon: Zap
  },
  {
    title: "Intelligent",
    description: "Powered by the latest AI models and machine learning algorithms",
    icon: Brain
  },
  {
    title: "Easy to Use",
    description: "Intuitive interfaces designed for both beginners and experts",
    icon: Sparkles
  }
];
