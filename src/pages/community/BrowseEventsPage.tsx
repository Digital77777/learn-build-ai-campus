import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Users, Clock, MapPin, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const BrowseEventsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const upcomingEvents = [
    {
      id: 1,
      title: "AI Ethics Workshop",
      date: "March 15, 2024",
      time: "2:00 PM EST",
      duration: "2 hours",
      attendees: 156,
      maxAttendees: 200,
      type: "Workshop",
      location: "Virtual",
      description: "Join us for an in-depth discussion on AI ethics and responsible AI development.",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Machine Learning Q&A Session",
      date: "March 18, 2024",
      time: "1:00 PM EST",
      duration: "1.5 hours",
      attendees: 89,
      maxAttendees: 150,
      type: "Q&A",
      location: "Virtual",
      description: "Ask your ML questions to industry experts.",
      status: "upcoming"
    },
    {
      id: 3,
      title: "AI Tools Demo Day",
      date: "March 22, 2024",
      time: "3:00 PM EST",
      duration: "3 hours",
      attendees: 234,
      maxAttendees: 300,
      type: "Demo",
      location: "Virtual",
      description: "Discover the latest AI tools and technologies.",
      status: "upcoming"
    }
  ];

  const liveEvents = [
    {
      id: 4,
      title: "Live Coding: Build an AI Chatbot",
      time: "Now",
      duration: "Ongoing",
      attendees: 512,
      type: "Live Coding",
      location: "Virtual",
      description: "Join live coding session on building AI chatbots.",
      status: "live"
    }
  ];

  const handleJoinEvent = (eventId: number, isLive: boolean) => {
    toast({
      title: isLive ? "Joining Live Event!" : "Registered Successfully!",
      description: isLive 
        ? "Redirecting you to the live event..."
        : "You've been registered. We'll send you a reminder before the event starts.",
    });
  };

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
            Browse Events
          </h1>
          <p className="text-muted-foreground text-lg">
            Join workshops, Q&A sessions, and live demos with AI experts
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button onClick={() => navigate("/community/host-event")} className="bg-gradient-ai text-white">
            <Calendar className="mr-2 h-4 w-4" />
            Host Event
          </Button>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="live">Live Now</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6 mt-6">
            <div className="grid gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary">{event.type}</Badge>
                          <Badge variant="outline">{event.location}</Badge>
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
                        <p className="text-muted-foreground mb-4">{event.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{event.time} ({event.duration})</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{event.attendees}/{event.maxAttendees} attendees</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleJoinEvent(event.id, false)}
                        className="bg-gradient-ai text-white md:self-start"
                      >
                        Register
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No events found</h3>
                  <p className="text-muted-foreground">Try adjusting your search.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
          </TabsContent>

          <TabsContent value="live" className="space-y-6 mt-6">
            <div className="grid gap-6">
              {liveEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow border-primary">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="destructive" className="animate-pulse">● LIVE</Badge>
                          <Badge variant="secondary">{event.type}</Badge>
                          <Badge variant="outline">{event.location}</Badge>
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
                        <p className="text-muted-foreground mb-4">{event.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{event.attendees} watching now</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleJoinEvent(event.id, true)}
                        className="bg-gradient-ai text-white md:self-start"
                      >
                        Join Live
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BrowseEventsPage;
