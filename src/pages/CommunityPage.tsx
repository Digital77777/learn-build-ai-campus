import React, { useState } from "react";
import { Users, Plus, Calendar, MessageCircle, TrendingUp, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CommunityPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data - in a real app this would come from your database
  const topics = [
    {
      id: 1,
      title: "Best AI Tools for Content Creation in 2024",
      author: "Sarah Chen",
      avatar: "SC",
      replies: 24,
      lastActivity: "2 hours ago",
      tags: ["AI Tools", "Content Creation"],
      trending: true
    },
    {
      id: 2,
      title: "How to optimize machine learning models for production",
      author: "David Martinez",
      avatar: "DM",
      replies: 18,
      lastActivity: "5 hours ago",
      tags: ["Machine Learning", "Production"]
    },
    {
      id: 3,
      title: "Building a successful AI startup: Lessons learned",
      author: "Emily Johnson",
      avatar: "EJ",
      replies: 42,
      lastActivity: "1 day ago",
      tags: ["Startup", "AI Business"]
    }
  ];

  const events = [
    {
      id: 1,
      title: "AI Ethics Workshop",
      date: "March 15, 2024",
      time: "2:00 PM EST",
      attendees: 156,
      type: "Workshop"
    },
    {
      id: 2,
      title: "Machine Learning Q&A Session",
      date: "March 18, 2024", 
      time: "1:00 PM EST",
      attendees: 89,
      type: "Q&A"
    },
    {
      id: 3,
      title: "AI Tools Demo Day",
      date: "March 22, 2024",
      time: "3:00 PM EST",
      attendees: 234,
      type: "Demo"
    }
  ];

  const insights = [
    {
      id: 1,
      title: "The Future of AI in Education",
      author: "Alex Thompson",
      avatar: "AT",
      excerpt: "Exploring how artificial intelligence is revolutionizing the way we learn and teach...",
      readTime: "5 min read",
      likes: 128
    },
    {
      id: 2,
      title: "No-Code AI: Democratizing Machine Learning",
      author: "Maria Rodriguez",
      avatar: "MR",
      excerpt: "How no-code platforms are making AI accessible to everyone, regardless of technical background...",
      readTime: "8 min read",
      likes: 95
    }
  ];

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
              <Button size="lg" className="bg-gradient-ai text-white">
                <Plus className="mr-2 h-5 w-5" />
                Start a Topic
              </Button>
              <Button variant="outline" size="lg">
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
              <Button variant="outline">
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
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Topic
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {topics.map((topic) => (
                    <Card key={topic.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {topic.trending && (
                                <Badge variant="secondary" className="text-xs">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  Trending
                                </Badge>
                              )}
                              <div className="flex gap-1">
                                {topic.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">
                              {topic.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarFallback className="text-xs">{topic.avatar}</AvatarFallback>
                                </Avatar>
                                <span>{topic.author}</span>
                              </div>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                <span>{topic.replies} replies</span>
                              </div>
                              <span>•</span>
                              <span>{topic.lastActivity}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Events Tab */}
              <TabsContent value="events" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Upcoming Events</h2>
                  <Button>
                    <Calendar className="mr-2 h-4 w-4" />
                    Host Event
                  </Button>
                </div>

                <div className="grid gap-4">
                  {events.map((event) => (
                    <Card key={event.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary">{event.type}</Badge>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <span>{event.date}</span>
                              <span>•</span>
                              <span>{event.time}</span>
                              <span>•</span>
                              <span>{event.attendees} attendees</span>
                            </div>
                          </div>
                          <Button>Join Event</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Insights Tab */}
              <TabsContent value="insights" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Community Insights</h2>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Share Insight
                  </Button>
                </div>

                <div className="space-y-6">
                  {insights.map((insight) => (
                    <Card key={insight.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                          {insight.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {insight.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">{insight.avatar}</AvatarFallback>
                            </Avatar>
                            <span>{insight.author}</span>
                            <span>•</span>
                            <span>{insight.readTime}</span>
                          </div>
                          <span>{insight.likes} likes</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
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
                  <span className="font-semibold">12,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Topics Today</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Events This Week</span>
                  <span className="font-semibold">8</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Start Discussion
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Create Event
                </Button>
                <Button variant="outline" className="w-full justify-start">
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