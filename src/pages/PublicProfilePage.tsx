import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Briefcase, MapPin, Link as LinkIcon, Linkedin, Github, Twitter, Mail, MessageCircle, Lightbulb, Calendar } from "lucide-react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { SEOHead } from "@/components/SEOHead";

const PublicProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["public-profile", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const { data: activity } = useQuery({
    queryKey: ["user-activity", userId],
    queryFn: async () => {
      const [topicsRes, insightsRes, eventsRes] = await Promise.all([
        supabase
          .from("community_topics")
          .select("id, title, created_at")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(5),
        supabase
          .from("community_insights")
          .select("id, title, created_at, likes_count")
          .eq("user_id", userId)
          .eq("is_published", true)
          .order("created_at", { ascending: false })
          .limit(5),
        supabase
          .from("community_events")
          .select("id, title, event_date, created_at")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      return {
        topics: topicsRes.data || [],
        insights: insightsRes.data || [],
        events: eventsRes.data || [],
      };
    },
    enabled: !!userId,
  });

  const getInitials = (name: string | undefined, email: string | undefined) => {
    if (name) {
      return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return "U";
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Profile not found</p>
            <Button onClick={() => navigate(-1)} className="mt-4">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${profile.full_name || "User Profile"} - Digital Intelligence Marketplace`}
        description={profile.bio || "View user profile and community contributions"}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={profile.avatar_url} />
                  <AvatarFallback className="text-3xl">
                    {getInitials(profile.full_name, profile.email)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-1">
                      {profile.full_name || "Community Member"}
                    </h1>
                    {profile.headline && (
                      <p className="text-lg text-muted-foreground flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {profile.headline}
                      </p>
                    )}
                  </div>

                  {profile.location && (
                    <p className="text-muted-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {profile.location}
                    </p>
                  )}

                  {profile.bio && (
                    <div className="pt-2">
                      <p className="text-foreground whitespace-pre-wrap">{profile.bio}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Expertise */}
          {profile.skills && profile.skills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill: string) => (
                    <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Links & Contact */}
          {(profile.website || profile.linkedin_url || profile.github_url || profile.twitter_url || profile.email) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <LinkIcon className="w-5 h-5" />
                  Links & Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>{profile.email}</span>
                  </a>
                )}

                {profile.website && (
                  <>
                    <Separator />
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <LinkIcon className="w-5 h-5" />
                      <span>{profile.website}</span>
                    </a>
                  </>
                )}

                {profile.linkedin_url && (
                  <>
                    <Separator />
                    <a
                      href={profile.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span>LinkedIn Profile</span>
                    </a>
                  </>
                )}

                {profile.github_url && (
                  <>
                    <Separator />
                    <a
                      href={profile.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      <span>GitHub Profile</span>
                    </a>
                  </>
                )}

                {profile.twitter_url && (
                  <>
                    <Separator />
                    <a
                      href={profile.twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                      <span>Twitter / X Profile</span>
                    </a>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Community Activity */}
          {activity && (activity.topics.length > 0 || activity.insights.length > 0 || activity.events.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Community Contributions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Topics */}
                {activity.topics.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Recent Topics
                    </h4>
                    <div className="space-y-2">
                      {activity.topics.map((topic) => (
                        <div
                          key={topic.id}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                          onClick={() => navigate(`/community/topic/${topic.id}`)}
                        >
                          <span className="text-sm">{topic.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(topic.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Insights */}
                {activity.insights.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Recent Insights
                    </h4>
                    <div className="space-y-2">
                      {activity.insights.map((insight) => (
                        <div
                          key={insight.id}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                          <span className="text-sm">{insight.title}</span>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{insight.likes_count} likes</span>
                            <span>{new Date(insight.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Events */}
                {activity.events.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Hosted Events
                    </h4>
                    <div className="space-y-2">
                      {activity.events.map((event) => (
                        <div
                          key={event.id}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                          <span className="text-sm">{event.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(event.event_date).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default PublicProfilePage;
