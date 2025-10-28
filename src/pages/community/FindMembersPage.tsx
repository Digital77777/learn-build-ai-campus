import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, MessageCircle, UserPlus, Award, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useActiveMembers, type ActiveMember } from "@/hooks/useActiveMembers";

const FindMembersPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: members = [], isLoading } = useActiveMembers(searchQuery);

  const topContributors = useMemo(() => {
    return members.filter((m) => m.is_top_contributor);
  }, [members]);

  const handleConnect = (memberId: string, memberName: string) => {
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

  const getInitials = (name: string | null) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getJoinedYear = (date: string) => {
    return new Date(date).getFullYear().toString();
  };

  const MemberCard = ({ member }: { member: ActiveMember }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
            <div className="relative flex-shrink-0">
              <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
                <AvatarFallback className="text-sm sm:text-lg font-semibold bg-gradient-ai text-white">
                  {getInitials(member.full_name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2 mb-1">
                <h3 className="text-base sm:text-lg font-semibold truncate">
                  {member.full_name || "Anonymous User"}
                </h3>
                {member.is_top_contributor && (
                  <Badge className="bg-amber-500 text-white flex-shrink-0 gap-1 px-2 py-0.5">
                    <Award className="h-3 w-3" />
                    <span className="text-xs">Top</span>
                  </Badge>
                )}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 truncate">
                {member.email}
              </p>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground">
                <span className="font-medium">{member.contributions} contributions</span>
                <span>•</span>
                <span>Joined {getJoinedYear(member.joined_at)}</span>
              </div>
            </div>
          </div>
          <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
            <Button 
              size="sm"
              onClick={() => handleConnect(member.user_id, member.full_name || "User")}
              className="bg-gradient-ai text-white flex-1 sm:flex-initial"
            >
              <UserPlus className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">Connect</span>
            </Button>
            <Button 
              size="sm"
              variant="outline"
              onClick={() => handleMessage(member.full_name || "User")}
              className="flex-1 sm:flex-initial"
            >
              <MessageCircle className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">Message</span>
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
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="all">All Members</TabsTrigger>
            <TabsTrigger value="top" className="gap-2">
              <Award className="h-4 w-4" />
              Top Contributors
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3 sm:space-y-4 mt-6">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : members.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">No members found</p>
                </CardContent>
              </Card>
            ) : (
              members.map((member) => (
                <MemberCard key={member.user_id} member={member} />
              ))
            )}
          </TabsContent>

          <TabsContent value="top" className="space-y-3 sm:space-y-4 mt-6">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : topContributors.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Award className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No top contributors yet. Make 10+ posts to earn this badge!
                  </p>
                </CardContent>
              </Card>
            ) : (
              topContributors.map((member) => (
                <MemberCard key={member.user_id} member={member} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FindMembersPage;
