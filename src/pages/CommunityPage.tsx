import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Plus, Calendar, MessageCircle, TrendingUp, Search, Filter, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCommunity } from "@/hooks/useCommunity";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";

const CommunityPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const {
    useTopics,
    useEvents,
    useInsights,
    useStats,
    registerForEvent,
    toggleInsightLike,
  } = useCommunity();

  const { data: topics, isLoading: topicsLoading } = useTopics(searchQuery);
  const { data: events, isLoading: eventsLoading } = useEvents(searchQuery);
  const { data: insights, isLoading: insightsLoading } = useInsights(searchQuery);
  const { data: stats } = useStats();

  // Handler functions for button interactions
  const handleStartTopic = () => {
    navigate("/community/start-topic");
  };

  const handleBrowseEvents = () => {
    navigate("/community/browse-events");
  };

  const handleFilters = () => {
    console.log("Opening filters...");
  };

  const handleHostEvent = () => {
    navigate("/community/host-event");
  };

  const handleJoinEvent = (eventId: number) => {
    navigate("/community/browse-events");
  };

  const handleShareInsight = () => {
    navigate("/community/share-insight");
  };

  const handleStartDiscussion = () => {
    navigate("/community/start-topic");
  };

  const handleCreateEvent = () => {
    navigate("/community/host-event");
  };

  const handleFindMembers = () => {
    navigate("/community/find-members");
  };

  const handleJoinEventClick = async (eventId: string, isRegistered: boolean) => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (!isRegistered) {
      await registerForEvent.mutateAsync(eventId);
    }
  };

  const handleLikeInsight = async (insightId: string, isLiked: boolean) => {
    if (!user) {
      navigate("/auth");
      return;
    }
    await toggleInsightLike.mutateAsync({ insightId, isLiked });
  };

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
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-ai bg-clip-text text-transparent">
              Join Our AI Community
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Connect with AI enthusiasts, share insights, participate in live events, and grow together in the world of artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-ai text-white" onClick={handleStartTopic}>
                <Plus className="mr-2 h-5 w-5" />
                Start a Topic
              </Button>
              <Button variant="outline" size="lg" onClick={handleBrowseEvents}>
                <Calendar className="mr-2 h-5 w-5" />
                Browse Events
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search topics, events, or insights..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" onClick={handleFilters}>
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>

            {/* Tabs Navigation */}
            <Tabs defaultValue="topics" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="topics">Discussion Topics</TabsTrigger>
                <TabsTrigger value="events">Live Events</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              {/* Topics Tab */}
              <TabsContent value="topics" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Recent Discussions</h2>
              <Button onClick={handleStartTopic}>
                <Plus className="mr-2 h-4 w-4" />
                New Topic
              </Button>
            </div>
            
            {topicsLoading ? (
              <div className="space-y-4">
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
              <div className="space-y-4">
                {topics && topics.length > 0 ? (
                  topics.map((topic) => (
                    <Card 
                      key={topic.id} 
                      className="hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer group"
                      onClick={() => navigate(`/community/topic/${topic.id}`)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {topic.is_pinned && (
                                <Badge variant="secondary" className="text-xs">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  Pinned
                                </Badge>
                              )}
                              {topic.tags && topic.tags.length > 0 && (
                                <div className="flex gap-1">
                                  {topic.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                              {topic.title}
                            </h3>
                            <p className="text-muted-foreground mb-3 line-clamp-2">
                              {topic.content.substring(0, 200)}...
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarFallback className="text-xs">
                                    {getInitials(topic.profiles?.full_name, topic.profiles?.email)}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{topic.profiles?.full_name || topic.profiles?.email || "Anonymous"}</span>
                              </div>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                <span>{topic.replies_count} {topic.replies_count === 1 ? 'reply' : 'replies'}</span>
                              </div>
                              <span>•</span>
                              <span>{formatDistanceToNow(new Date(topic.created_at), { addSuffix: true })}</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/community/topic/${topic.id}`);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          View Discussion →
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">No discussions found</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchQuery ? "Try adjusting your search." : "Be the first to start a conversation!"}
                      </p>
                      <Button onClick={handleStartTopic}>
                        <Plus className="mr-2 h-4 w-4" />
                        Start a Topic
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
              </TabsContent>

              {/* Events Tab */}
              <TabsContent value="events" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Upcoming Events</h2>
                <Button onClick={handleHostEvent}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Host Event
                </Button>
              </div>

              {eventsLoading ? (
                <div className="grid gap-4">
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
                <div className="grid gap-4">
                  {events && events.length > 0 ? (
                    events.map((event) => (
                      <Card key={event.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary">{event.event_type}</Badge>
                                {event.is_online && <Badge variant="outline">Online</Badge>}
                              </div>
                              <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                <span>{new Date(event.event_date).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>{event.event_time}</span>
                                <span>•</span>
                                <span>{event.attendees_count} attendees</span>
                              </div>
                            </div>
                            <Button
                              onClick={() => handleJoinEventClick(event.id, event.is_registered || false)}
                              disabled={event.is_registered}
                            >
                              {event.is_registered ? "Registered" : "Join Event"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="p-12 text-center">
                        <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-semibold mb-2">No upcoming events</h3>
                        <p className="text-muted-foreground mb-4">Host an event to bring the community together!</p>
                        <Button onClick={handleHostEvent}>
                          <Calendar className="mr-2 h-4 w-4" />
                          Host an Event
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
              </TabsContent>

              {/* Insights Tab */}
              <TabsContent value="insights" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Community Insights</h2>
                <Button onClick={handleShareInsight}>
                  <Plus className="mr-2 h-4 w-4" />
                  Share Insight
                </Button>
              </div>

              {insightsLoading ? (
                <div className="space-y-6">
                  {[1, 2].map((i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <Skeleton className="h-6 w-3/4 mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {insights && insights.length > 0 ? (
                    insights.map((insight) => (
                      <Card key={insight.id} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{insight.category}</Badge>
                          </div>
                          <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                            {insight.title}
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {insight.content.substring(0, 150)}...
                          </p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-xs">
                                  {getInitials(insight.profiles?.full_name, insight.profiles?.email)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{insight.profiles?.full_name || insight.profiles?.email || "Anonymous"}</span>
                              <span>•</span>
                              <span>{insight.read_time || "5 min read"}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLikeInsight(insight.id, insight.is_liked || false)}
                            >
                              <Heart
                                className={`h-4 w-4 mr-1 ${insight.is_liked ? "fill-current text-red-500" : ""}`}
                              />
                              {insight.likes_count}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="p-12 text-center">
                        <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-semibold mb-2">No insights yet</h3>
                        <p className="text-muted-foreground mb-4">Share your knowledge with the community!</p>
                        <Button onClick={handleShareInsight}>
                          <Plus className="mr-2 h-4 w-4" />
                          Share an Insight
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Members</span>
                  <span className="font-semibold">{stats?.activeMembers || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Topics</span>
                  <span className="font-semibold">{stats?.topicsToday || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Events</span>
                  <span className="font-semibold">{stats?.eventsThisWeek || 0}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {user && (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => navigate("/community/my-activity")}
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    My Activity
                  </Button>
                )}
                <Button variant="outline" className="w-full justify-start" onClick={handleStartDiscussion}>
                  <Plus className="mr-2 h-4 w-4" />
                  Start Discussion
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handleCreateEvent}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Create Event
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handleFindMembers}>
                  <Users className="mr-2 h-4 w-4" />
                  Find Members
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;