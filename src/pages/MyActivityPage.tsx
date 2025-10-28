import { useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, Calendar, TrendingUp, Heart, Users, User, Eye, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useCommunity } from "@/hooks/useCommunity";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";
import { ProfileView } from "@/components/profile/ProfileView";
import { InsightDetailModal } from "@/components/community/InsightDetailModal";
import { EditInsightModal } from "@/components/community/EditInsightModal";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { CommunityTopic, CommunityEvent, CommunityInsight } from "@/types/community";
import { useState } from "react";

const MyActivityPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { useMyActivity, updateInsight, deleteInsight } = useCommunity();
  const { data: activity, isLoading } = useMyActivity();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<CommunityInsight | null>(null);
  const [editingInsight, setEditingInsight] = useState<CommunityInsight | null>(null);
  const [deletingInsightId, setDeletingInsightId] = useState<string | null>(null);

  // Fetch user profile
  const { data: profile, isLoading: profileLoading, refetch: refetchProfile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  if (!user) {
    navigate("/auth");
    return null;
  }

  const getInitials = (name: string | undefined, email: string | undefined) => {
    if (name) {
      return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return "U";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 py-12">
        <div className="container mx-auto px-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/community")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Community
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Activity</h1>
          <p className="text-muted-foreground">
            View all your posts, events, insights, and engagement from the community
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Tabs defaultValue="topics" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="topics" className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4 md:hidden" />
                <span className="hidden md:inline">My Topics</span>
                <span className="md:hidden">Topics</span>
                <span className="ml-1">({activity?.topics?.length || 0})</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-1">
                <Calendar className="w-4 h-4 md:hidden" />
                <span className="hidden md:inline">My Events</span>
                <span className="md:hidden">Events</span>
                <span className="ml-1">({activity?.events?.length || 0})</span>
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 md:hidden" />
                <span className="hidden md:inline">My Insights</span>
                <span className="md:hidden">Insights</span>
                <span className="ml-1">({activity?.insights?.length || 0})</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-1">
                <User className="w-4 h-4 md:hidden" />
                <span className="hidden md:inline">My Profile</span>
                <span className="md:hidden">Profile</span>
              </TabsTrigger>
            </TabsList>

            {/* Topics Tab */}
            <TabsContent value="topics" className="space-y-6 mt-6">
              {activity?.topics && activity.topics.length > 0 ? (
                activity.topics.map((topic: CommunityTopic) => (
                  <Card 
                    key={topic.id} 
                    className="hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer group"
                    onClick={() => navigate(`/community/topic/${topic.id}`)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                            {topic.title}
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {topic.content.substring(0, 150)}...
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{topic.replies_count} replies</span>
                            </div>
                            <span>•</span>
                            <span>
                              {formatDistanceToNow(new Date(topic.created_at), { addSuffix: true })}
                            </span>
                            {topic.tags && topic.tags.length > 0 && (
                              <>
                                <span>•</span>
                                <div className="flex gap-1">
                                  {topic.tags.map((tag: string) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Comments from others */}
                      {topic.topic_replies && topic.topic_replies.length > 0 && (
                        <div className="border-t pt-4 mt-4">
                          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                            <MessageCircle className="w-4 h-4" />
                            Recent Comments ({topic.topic_replies.length})
                          </h4>
                          <div className="space-y-3">
                            {topic.topic_replies.slice(0, 3).map((reply) => (
                              <div 
                                key={reply.id} 
                                className="bg-muted/50 p-3 rounded-lg cursor-pointer hover:bg-muted transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/community/topic/${topic.id}`);
                                }}
                              >
                                <p className="text-sm mb-2">{reply.content}</p>
                                <span className="text-xs text-muted-foreground">
                                  {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
                                </span>
                              </div>
                            ))}
                            {topic.topic_replies.length > 3 && (
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="p-0 h-auto"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/community/topic/${topic.id}`);
                                }}
                              >
                                View all {topic.topic_replies.length} comments
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No topics yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start a discussion to engage with the community!
                    </p>
                    <Button onClick={() => navigate("/community/start-topic")}>
                      Start a Topic
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-6 mt-6">
              {activity?.events && activity.events.length > 0 ? (
                activity.events.map((event: CommunityEvent) => (
                  <Card key={event.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">{event.event_type}</Badge>
                            {event.is_online && <Badge variant="outline">Online</Badge>}
                            <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'}>
                              {event.status}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(event.event_date).toLocaleDateString()}</span>
                            </div>
                            <span>•</span>
                            <span>{event.event_time}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{event.attendees_count} attendees</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Attendees */}
                      {event.event_attendees && event.event_attendees.length > 0 && (
                        <div className="border-t pt-4 mt-4">
                          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Registered Attendees ({event.event_attendees.length})
                          </h4>
                          <div className="flex items-center gap-2">
                            {event.event_attendees.slice(0, 5).map((attendee) => (
                              <Avatar key={attendee.id} className="w-8 h-8">
                                <AvatarFallback className="text-xs">U</AvatarFallback>
                              </Avatar>
                            ))}
                            {event.event_attendees.length > 5 && (
                              <span className="text-sm text-muted-foreground">
                                +{event.event_attendees.length - 5} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No events yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Host an event to bring the community together!
                    </p>
                    <Button onClick={() => navigate("/community/host-event")}>
                      Host an Event
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Insights Tab */}
            <TabsContent value="insights" className="space-y-6 mt-6">
              {activity?.insights && activity.insights.length > 0 ? (
                activity.insights.map((insight: CommunityInsight) => (
                  <Card key={insight.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{insight.category}</Badge>
                            {insight.read_time && (
                              <Badge variant="secondary">{insight.read_time}</Badge>
                            )}
                          </div>
                          <h3 className="text-xl font-semibold mb-2">{insight.title}</h3>
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {insight.content.substring(0, 200)}...
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              <span>{insight.likes_count} likes</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              <span>{insight.views_count} views</span>
                            </div>
                            <span>•</span>
                            <span>
                              {formatDistanceToNow(new Date(insight.created_at), { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mb-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedInsight(insight)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Read Full Insight
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingInsight(insight)}
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDeletingInsightId(insight.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>

                      {/* Likes from others */}
                      {insight.insight_likes && insight.insight_likes.length > 0 && (
                        <div className="border-t pt-4 mt-4">
                          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            Liked by {insight.insight_likes.length} {insight.insight_likes.length === 1 ? 'person' : 'people'}
                          </h4>
                          <div className="flex items-center gap-2">
                            {insight.insight_likes.slice(0, 10).map((like) => (
                              <Avatar key={like.id} className="w-8 h-8">
                                <AvatarFallback className="text-xs bg-primary/10">U</AvatarFallback>
                              </Avatar>
                            ))}
                            {insight.insight_likes.length > 10 && (
                              <span className="text-sm text-muted-foreground">
                                +{insight.insight_likes.length - 10} more
                              </span>
                            )}
                          </div>
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 h-auto mt-2"
                            onClick={() => setSelectedInsight(insight)}
                          >
                            View all who liked this insight
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No insights yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Share your knowledge with the community!
                    </p>
                    <Button onClick={() => navigate("/community/share-insight")}>
                      Share an Insight
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6 mt-6">
              {profileLoading ? (
                <Card>
                  <CardContent className="p-6">
                    <Skeleton className="h-24 w-24 rounded-full mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ) : profile ? (
                isEditingProfile ? (
                  <ProfileEditForm 
                    profile={profile} 
                    onSuccess={() => {
                      refetchProfile();
                      setIsEditingProfile(false);
                    }} 
                  />
                ) : (
                  <ProfileView 
                    profile={profile} 
                    onEdit={() => setIsEditingProfile(true)} 
                  />
                )
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <User className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">Profile not found</h3>
                    <p className="text-muted-foreground">
                      Unable to load your profile information.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Insight Detail Modal */}
      {selectedInsight && (
        <InsightDetailModal
          insight={selectedInsight}
          open={!!selectedInsight}
          onOpenChange={(open) => !open && setSelectedInsight(null)}
        />
      )}

      {/* Edit Insight Modal */}
      {editingInsight && (
        <EditInsightModal
          insight={editingInsight}
          open={!!editingInsight}
          onOpenChange={(open) => !open && setEditingInsight(null)}
          onSave={(data) => {
            updateInsight.mutate(
              { insightId: editingInsight.id, data },
              {
                onSuccess: () => setEditingInsight(null),
              }
            );
          }}
          isLoading={updateInsight.isPending}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingInsightId} onOpenChange={(open) => !open && setDeletingInsightId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Insight</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this insight? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingInsightId) {
                  deleteInsight.mutate(deletingInsightId, {
                    onSuccess: () => setDeletingInsightId(null),
                  });
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyActivityPage;
