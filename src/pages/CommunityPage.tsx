import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Plus, Calendar, MessageCircle, TrendingUp, Search, Filter, Heart, X, Clock, Check } from "lucide-react";
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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { InsightDetailModal } from "@/components/community/InsightDetailModal";
import type { CommunityInsight } from "@/types/community";

const CommunityPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("topics");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [eventType, setEventType] = useState("all");
  const [insightCategory, setInsightCategory] = useState("all");
  const [selectedInsight, setSelectedInsight] = useState<CommunityInsight | null>(null);
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

  const handleResetFilters = () => {
    setSortBy("recent");
    setEventType("all");
    setInsightCategory("all");
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
              <Button variant="outline" size="lg" onClick={() => navigate('/community/inbox')}>
                <MessageCircle className="mr-2 h-5 w-5" />
                My Inbox
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
              <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter {activeTab === "topics" ? "Topics" : activeTab === "events" ? "Events" : "Insights"}</SheetTitle>
                    <SheetDescription>
                      Refine your search to find exactly what you're looking for
                    </SheetDescription>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    {/* Sort By - Available for all tabs */}
                    <div className="space-y-3">
                      <Label htmlFor="sort">Sort By</Label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger id="sort">
                          <SelectValue placeholder="Select sorting" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">Most Recent</SelectItem>
                          <SelectItem value="popular">Most Popular</SelectItem>
                          {activeTab === "topics" && <SelectItem value="replies">Most Replies</SelectItem>}
                          {activeTab === "insights" && <SelectItem value="likes">Most Liked</SelectItem>}
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    {/* Event Type Filter - Only for events tab */}
                    {activeTab === "events" && (
                      <div className="space-y-3">
                        <Label htmlFor="event-type">Event Type</Label>
                        <Select value={eventType} onValueChange={setEventType}>
                          <SelectTrigger id="event-type">
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Events</SelectItem>
                            <SelectItem value="Workshop">Workshops</SelectItem>
                            <SelectItem value="Webinar">Webinars</SelectItem>
                            <SelectItem value="Meetup">Meetups</SelectItem>
                            <SelectItem value="Conference">Conferences</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Category Filter - Only for insights tab */}
                    {activeTab === "insights" && (
                      <div className="space-y-3">
                        <Label htmlFor="category">Category</Label>
                        <Select value={insightCategory} onValueChange={setInsightCategory}>
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="Tutorial">Tutorials</SelectItem>
                            <SelectItem value="News">News</SelectItem>
                            <SelectItem value="Research">Research</SelectItem>
                            <SelectItem value="Best Practice">Best Practices</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <Separator />

                    <div className="flex gap-3 pt-4">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={handleResetFilters}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Reset
                      </Button>
                      <Button 
                        className="flex-1"
                        onClick={() => setFilterOpen(false)}
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Tabs Navigation */}
            <Tabs defaultValue="topics" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="topics" className="flex items-center justify-center gap-1.5 data-[state=active]:bg-primary/10">
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Discussion</span>
                  <span className="sm:hidden text-xs">Topics</span>
                </TabsTrigger>
                <TabsTrigger value="events" className="flex items-center justify-center gap-1.5 data-[state=active]:bg-primary/10">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Live Events</span>
                  <span className="sm:hidden text-xs">Events</span>
                </TabsTrigger>
                <TabsTrigger value="insights" className="flex items-center justify-center gap-1.5 data-[state=active]:bg-primary/10">
                  <TrendingUp className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Insights</span>
                  <span className="sm:hidden text-xs">Insights</span>
                </TabsTrigger>
              </TabsList>

              {/* Topics Tab */}
              <TabsContent value="topics" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <h2 className="text-xl sm:text-2xl font-semibold">Recent Discussions</h2>
              <Button onClick={handleStartTopic} className="w-full sm:w-auto">
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
              <div className="space-y-3">
                {topics && topics.length > 0 ? (
                  topics.map((topic) => (
                    <Card 
                      key={topic.id} 
                      className="hover:shadow-md transition-all cursor-pointer border-border/40 overflow-hidden"
                      onClick={() => navigate(`/community/topic/${topic.id}`)}
                    >
                      <CardContent className="p-0">
                        {/* Post Header - Facebook Style */}
                        <div className="flex items-center gap-3 p-4 pb-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="text-sm bg-primary/10 text-primary font-medium">
                              {getInitials(topic.profiles?.full_name, topic.profiles?.email)}
                            </AvatarFallback>
                          </Avatar>
                          <div 
                            className="flex-1 min-w-0 cursor-pointer hover:text-primary transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (topic.profiles?.user_id) {
                                navigate(`/profile/${topic.profiles.user_id}`);
                              }
                            }}
                          >
                            <p className="font-semibold text-sm leading-tight">
                              {topic.profiles?.full_name || topic.profiles?.email || "Anonymous"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(topic.created_at), { addSuffix: true })}
                            </p>
                          </div>
                          {topic.is_pinned && (
                            <Badge variant="secondary" className="text-xs shrink-0">
                              <TrendingUp className="w-3 h-3" />
                            </Badge>
                          )}
                        </div>

                        {/* Post Content */}
                        <div className="px-4 pb-3">
                          <h3 className="text-base font-semibold mb-2 leading-snug">
                            {topic.title}
                          </h3>
                          <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">
                            {topic.content}
                          </p>
                        </div>

                        {/* Tags */}
                        {topic.tags && topic.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                            {topic.tags.slice(0, 3).map((tag) => (
                              <Badge 
                                key={tag} 
                                variant="secondary" 
                                className="text-xs font-normal bg-secondary/50"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {topic.tags.length > 3 && (
                              <Badge variant="secondary" className="text-xs font-normal bg-secondary/50">
                                +{topic.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* Post Actions - Facebook Style */}
                        <div className="border-t border-border/40 px-4 py-2.5 flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="flex-1 h-9 text-muted-foreground hover:text-foreground hover:bg-accent/50"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/community/topic/${topic.id}`);
                            }}
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">
                              {topic.replies_count === 0 ? 'Comment' : `${topic.replies_count}`}
                            </span>
                          </Button>
                        </div>
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
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <h2 className="text-xl sm:text-2xl font-semibold">Upcoming Events</h2>
                <Button onClick={handleHostEvent} className="w-full sm:w-auto bg-gradient-ai text-white">
                  <Calendar className="mr-2 h-4 w-4" />
                  Host Event
                </Button>
              </div>

              {eventsLoading ? (
                <div className="grid gap-3 sm:gap-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="shadow-sm">
                      <CardContent className="p-4 sm:p-6">
                        <Skeleton className="h-6 w-3/4 mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid gap-3 sm:gap-4">
                  {events && events.length > 0 ? (
                    events.map((event) => (
                      <Card key={event.id} className="hover:shadow-lg transition-all border-border/40 shadow-sm">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex flex-col gap-4">
                            {/* Event Header */}
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="secondary" className="capitalize text-xs font-medium">
                                {event.event_type}
                              </Badge>
                              {event.is_online && (
                                <Badge variant="outline" className="text-xs">
                                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5" />
                                  Online
                                </Badge>
                              )}
                              {event.is_registered && (
                                <Badge className="bg-green-600 hover:bg-green-700 text-xs ml-auto">
                                  ✓ Registered
                                </Badge>
                              )}
                            </div>

                            {/* Event Title */}
                            <div>
                              <h3 className="text-base sm:text-lg font-semibold mb-2 leading-tight">
                                {event.title}
                              </h3>
                              {event.description && (
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {event.description}
                                </p>
                              )}
                            </div>

                            {/* Event Meta */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-primary" />
                                <span className="font-medium">
                                  {new Date(event.event_date).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-primary" />
                                <span className="font-medium">{event.event_time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-primary" />
                                <span className="font-medium">
                                  {event.attendees_count} {event.attendees_count === 1 ? 'attendee' : 'attendees'}
                                </span>
                              </div>
                            </div>

                            {/* Action Button */}
                            <Button
                              onClick={() => handleJoinEventClick(event.id, event.is_registered || false)}
                              disabled={event.is_registered}
                              className="w-full sm:w-auto bg-gradient-ai text-white"
                              size="sm"
                            >
                              {event.is_registered ? (
                                <>
                                  <Check className="mr-2 h-4 w-4" />
                                  Already Registered
                                </>
                              ) : (
                                <>
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Register Now
                                </>
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card className="shadow-sm">
                      <CardContent className="p-8 sm:p-12 text-center">
                        <div className="flex flex-col items-center">
                          <div className="p-3 bg-primary/10 rounded-full mb-4">
                            <Calendar className="w-8 h-8 sm:w-12 sm:h-12 text-primary" />
                          </div>
                          <h3 className="text-base sm:text-lg font-semibold mb-2">No upcoming events</h3>
                          <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                            Host an event to bring the community together!
                          </p>
                          <Button onClick={handleHostEvent} className="w-full sm:w-auto bg-gradient-ai text-white">
                            <Calendar className="mr-2 h-4 w-4" />
                            Host an Event
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
              </TabsContent>

              {/* Insights Tab */}
              <TabsContent value="insights" className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <h2 className="text-xl sm:text-2xl font-semibold">Community Insights</h2>
                <Button onClick={handleShareInsight} className="w-full sm:w-auto bg-gradient-ai text-white">
                  <TrendingUp className="mr-2 h-4 w-4" />
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
                      <Card 
                        key={insight.id} 
                        className="hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedInsight(insight)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{insight.category}</Badge>
                            {insight.read_time && (
                              <Badge variant="secondary">{insight.read_time}</Badge>
                            )}
                          </div>
                          <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                            {insight.title}
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {insight.content.substring(0, 150)}...
                          </p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div 
                              className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (insight.profiles?.user_id) {
                                  navigate(`/profile/${insight.profiles.user_id}`);
                                }
                              }}
                            >
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-xs">
                                  {getInitials(insight.profiles?.full_name, insight.profiles?.email)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{insight.profiles?.full_name || insight.profiles?.email || "Anonymous"}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLikeInsight(insight.id, insight.is_liked || false);
                              }}
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
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="p-1.5 bg-primary/10 rounded-md">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">Active Members</span>
                  </div>
                  <span className="font-bold text-lg">{stats?.activeMembers || 0}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="p-1.5 bg-primary/10 rounded-md">
                      <MessageCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">Topics</span>
                  </div>
                  <span className="font-bold text-lg">{stats?.topicsToday || 0}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="p-1.5 bg-primary/10 rounded-md">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">Events</span>
                  </div>
                  <span className="font-bold text-lg">{stats?.eventsThisWeek || 0}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {user && (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors" 
                    onClick={() => navigate("/community/my-activity")}
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    <span className="font-medium">My Activity</span>
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors" 
                  onClick={handleStartDiscussion}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  <span className="font-medium">Start Discussion</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors" 
                  onClick={handleCreateEvent}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  <span className="font-medium">Create Event</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors" 
                  onClick={handleShareInsight}
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  <span className="font-medium">Share Insight</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors" 
                  onClick={handleFindMembers}
                >
                  <Users className="mr-2 h-4 w-4" />
                  <span className="font-medium">Find Members</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Insight Detail Modal */}
      {selectedInsight && (
        <InsightDetailModal
          insight={selectedInsight}
          open={!!selectedInsight}
          onOpenChange={(open) => !open && setSelectedInsight(null)}
        />
      )}
    </div>
  );
};

export default CommunityPage;