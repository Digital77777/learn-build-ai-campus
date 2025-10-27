import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Filter, MessageCircle, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const FindMembersPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const activeMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "SC",
      role: "AI Researcher",
      expertise: ["Machine Learning", "NLP", "Computer Vision"],
      contributions: 145,
      joined: "2023",
      status: "online"
    },
    {
      id: 2,
      name: "David Martinez",
      avatar: "DM",
      role: "ML Engineer",
      expertise: ["Deep Learning", "Python", "TensorFlow"],
      contributions: 98,
      joined: "2023",
      status: "online"
    },
    {
      id: 3,
      name: "Emily Johnson",
      avatar: "EJ",
      role: "AI Entrepreneur",
      expertise: ["AI Strategy", "Product Management", "Business"],
      contributions: 234,
      joined: "2022",
      status: "online"
    },
    {
      id: 4,
      name: "Alex Thompson",
      avatar: "AT",
      role: "Data Scientist",
      expertise: ["Data Analysis", "Statistics", "R"],
      contributions: 167,
      joined: "2023",
      status: "away"
    },
    {
      id: 5,
      name: "Maria Rodriguez",
      avatar: "MR",
      role: "AI Educator",
      expertise: ["Teaching", "Course Design", "AI Education"],
      contributions: 203,
      joined: "2022",
      status: "online"
    }
  ];

  const topContributors = [...activeMembers].sort((a, b) => b.contributions - a.contributions);

  const handleConnect = (memberId: number, memberName: string) => {
    toast({
      title: "Connection Request Sent",
      description: `Your connection request has been sent to ${memberName}.`,
    });
  };

  const handleMessage = (memberName: string) => {
    toast({
      title: "Opening Chat",
      description: `Starting conversation with ${memberName}...`,
    });
  };

  const MemberCard = ({ member }: { member: typeof activeMembers[0] }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="relative">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg font-semibold">{member.avatar}</AvatarFallback>
              </Avatar>
              <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-background ${
                member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
              }`} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {member.expertise.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{member.contributions} contributions</span>
                <span>•</span>
                <span>Joined {member.joined}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button 
              size="sm"
              onClick={() => handleConnect(member.id, member.name)}
              className="bg-gradient-ai text-white"
            >
              <UserPlus className="h-4 w-4 mr-1" />
              Connect
            </Button>
            <Button 
              size="sm"
              variant="outline"
              onClick={() => handleMessage(member.name)}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Message
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/community")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Community
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-ai bg-clip-text text-transparent">
            Find Active Members
          </h1>
          <p className="text-muted-foreground text-lg">
            Connect with AI enthusiasts, experts, and fellow learners
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, role, or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="active">Active Now</TabsTrigger>
            <TabsTrigger value="top">Top Contributors</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4 mt-6">
            {activeMembers.filter(m => m.status === 'online').map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </TabsContent>

          <TabsContent value="top" className="space-y-4 mt-6">
            {topContributors.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FindMembersPage;
