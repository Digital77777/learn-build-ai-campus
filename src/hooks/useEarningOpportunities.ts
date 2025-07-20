import { useEffect, useState } from "react";
import { Coins, DollarSign, TrendingUp } from "lucide-react";
import { EarningOpportunity } from "@/types/earnings";

// Mock data since the earning_opportunities table doesn't exist in the database
const mockEarningOpportunities: EarningOpportunity[] = [
  {
    title: "Freelance AI Projects",
    description: "Complete AI projects for real clients while building your portfolio",
    earnings: "$200-$2,000",
    timeframe: "per project",
    difficulty: "Beginner",
    icon: Coins,
    features: ["Guided project matching", "Skill verification", "Payment protection"],
    color: "text-emerald-600"
  },
  {
    title: "AI Tutoring",
    description: "Teach AI concepts to other students and earn while reinforcing your knowledge",
    earnings: "$25-$50",
    timeframe: "per hour",
    difficulty: "Intermediate",
    icon: DollarSign,
    features: ["Flexible scheduling", "Online platform", "Performance bonuses"],
    color: "text-blue-600"
  },
  {
    title: "Research Assistant",
    description: "Support AI research projects at universities and tech companies",
    earnings: "$500-$1,500",
    timeframe: "per month",
    difficulty: "Advanced",
    icon: TrendingUp,
    features: ["Research experience", "Academic networking", "Publication opportunities"],
    color: "text-purple-600"
  }
];

export function useEarningOpportunities() {
  const [data, setData] = useState<EarningOpportunity[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call with mock data
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setData(mockEarningOpportunities);
        setError(null);
      } catch (err) {
        setError("Failed to load earning opportunities");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
