import { AITool } from "@/types/aiTools";
import { FileText, Code, Brain, Image, MessageSquare } from "lucide-react";

export const aiTools: AITool[] = [
  {
    id: 1,
    name: "AI Writing Assistant",
    title: "AI Writing Assistant",
    description: "Generate essays, research papers, and creative content with advanced language models",
    icon: FileText,
    category: "Research",
    features: ["Essay generation", "Research assistance", "Grammar checking", "Citation help"],
    usage: "Free unlimited",
    pricing: "Free",
    gradient: "bg-gradient-learning"
  },
  {
    id: 2,
    name: "Code Generator",
    title: "Code Generator",
    description: "Generate, debug, and explain code in multiple programming languages",
    icon: Code,
    category: "Development",
    features: ["Code generation", "Bug fixing", "Code explanation", "Multiple languages"],
    usage: "Free unlimited",
    pricing: "Free",
    gradient: "bg-gradient-ai"
  },
  {
    id: 3,
    name: "Research Assistant",
    title: "Research Assistant",
    description: "Analyze academic papers, summarize content, and find credible sources",
    icon: Brain,
    category: "Research",
    features: ["Paper analysis", "Source finding", "Content summarization", "Citation generation"],
    usage: "Free unlimited",
    pricing: "Free",
    gradient: "bg-gradient-earn"
  },
  {
    id: 4,
    name: "Image Creator",
    title: "Image Creator",
    description: "Generate stunning visuals, diagrams, and illustrations for your projects",
    icon: Image,
    category: "Creative",
    features: ["Image generation", "Diagram creation", "Style customization", "High resolution"],
    usage: "50 images/day",
    pricing: "Premium",
    gradient: "bg-gradient-learning"
  },
  {
    id: 5,
    name: "Study Buddy",
    title: "Study Buddy",
    description: "Interactive Q&A, flashcards, and personalized tutoring for any subject",
    icon: MessageSquare,
    category: "Communication",
    features: ["Interactive Q&A", "Flashcard creation", "Subject tutoring", "Progress tracking"],
    usage: "Free unlimited",
    pricing: "Free",
    gradient: "bg-gradient-ai"
  }
];
