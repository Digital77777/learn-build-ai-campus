import Navigation from "@/components/Navigation";
import { Coins, TrendingUp, Users, Award, DollarSign, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const EarnPage = () => {
  const earningMethods = [
    {
      id: 1,
      title: "Complete Courses",
      description: "Earn AI coins by completing learning paths and achieving certifications",
      earning: "50-200 AI Coins",
      icon: <Award className="h-8 w-8" />,
      difficulty: "Easy",
      timeCommitment: "1-10 hours",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      id: 2,
      title: "Refer Friends",
      description: "Get rewarded when friends join and complete their first course",
      earning: "100 AI Coins",
      icon: <Users className="h-8 w-8" />,
      difficulty: "Easy",
      timeCommitment: "5 minutes",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      title: "Create Content",
      description: "Share tutorials, write articles, or create AI-related content",
      earning: "500-2000 AI Coins",
      icon: <TrendingUp className="h-8 w-8" />,
      difficulty: "Medium",
      timeCommitment: "2-8 hours",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      title: "Community Challenges",
      description: "Participate in monthly AI challenges and competitions",
      earning: "1000-5000 AI Coins",
      icon: <Coins className="h-8 w-8" />,
      difficulty: "Hard",
      timeCommitment: "10-40 hours",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const rewards = [
    { coins: 100, reward: "Premium Course Access (1 month)" },
    { coins: 500, reward: "AI Tools Pro Subscription (1 month)" },
    { coins: 1000, reward: "1-on-1 Mentorship Session" },
    { coins: 2500, reward: "Exclusive Masterclass Access" },
    { coins: 5000, reward: "AI Certification Program" },
    { coins: 10000, reward: "$100 Course Credit" }
  ];

  const stats = [
    { label: "Active Earners", value: "12,500+", icon: <Users className="h-5 w-5" /> },
    { label: "Total Coins Earned", value: "2.5M+", icon: <Coins className="h-5 w-5" /> },
    { label: "Rewards Claimed", value: "8,200+", icon: <Award className="h-5 w-5" /> },
    { label: "Average Monthly Earning", value: "450", icon: <DollarSign className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-success/10 rounded-full">
              <Coins className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-success">Start Earning Today</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-earn bg-clip-text text-transparent">
                Earn AI Coins
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Turn your AI learning journey into rewards. Earn coins, unlock premium features, and accelerate your career
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gradient-earn text-white hover:opacity-90">
                <Coins className="h-5 w-5 mr-2" />
                Start Earning
              </Button>
              <Button size="lg" variant="outline">
                View Rewards
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="text-primary">{stat.icon}</div>
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earning Methods */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ways to Earn AI Coins</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Multiple pathways to earn rewards while advancing your AI skills and contributing to the community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {earningMethods.map((method) => (
              <Card key={method.id} className="group hover:shadow-ai transition-all duration-300 border-border/50">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${method.gradient} flex items-center justify-center text-white mb-4`}>
                    {method.icon}
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {method.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs font-bold text-success">
                      {method.earning}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {method.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {method.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Time Commitment:</span>
                    <span className="font-medium">{method.timeCommitment}</span>
                  </div>
                  
                  <Button className="w-full group/btn">
                    Start Earning
                    <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Redeem Your Coins</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Exchange your AI coins for valuable rewards, premium features, and learning opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward, index) => (
              <Card key={index} className="border-border/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Coins className="h-5 w-5 text-primary" />
                      <span className="font-bold text-lg">{reward.coins}</span>
                    </div>
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{reward.reward}</p>
                  <Button size="sm" variant="outline" className="w-full">
                    Redeem
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple steps to start earning and redeeming AI coins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete Activities</h3>
              <p className="text-muted-foreground">
                Engage in learning, challenges, and community activities to earn coins
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Accumulate Coins</h3>
              <p className="text-muted-foreground">
                Watch your coin balance grow as you progress through the platform
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Redeem Rewards</h3>
              <p className="text-muted-foreground">
                Exchange your coins for premium features, courses, and more
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EarnPage;