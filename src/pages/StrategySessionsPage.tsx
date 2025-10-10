import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Target, Calendar as CalendarIcon, Clock, Video, CheckCircle2, Crown, User } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function StrategySessionsPage() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const availableSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const upcomingSessions = [
    {
      date: '2025-10-15',
      time: '10:00 AM',
      consultant: 'Dr. Michael Chen',
      topic: 'Revenue Optimization Strategy',
      type: 'Video Call'
    },
    {
      date: '2025-11-12',
      time: '02:00 PM',
      consultant: 'Emma Rodriguez',
      topic: 'Marketplace Growth Plan',
      type: 'Video Call'
    }
  ];

  const sessionTopics = [
    'Revenue optimization and growth strategies',
    'AI tool selection and workflow optimization',
    'Marketplace positioning and scaling',
    'Referral program maximization',
    'Personal brand building in AI space',
    'Career advancement and networking'
  ];

  const handleBookSession = (slot: string) => {
    toast({
      title: "Session Booked",
      description: `Your strategy session is scheduled for ${selectedDate?.toLocaleDateString()} at ${slot}`,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex items-center gap-3 mb-8">
        <Target className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Strategy Sessions</h1>
          <p className="text-muted-foreground">Monthly consultations to optimize your AI career</p>
        </div>
        <Badge variant="default" className="ml-auto">Career Tier</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Book Your Next Session</CardTitle>
            <CardDescription>Schedule a 1-on-1 consultation with our expert strategists</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Select Date</h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>

              <div>
                <h3 className="font-semibold mb-4">Available Time Slots</h3>
                <div className="grid grid-cols-2 gap-3">
                  {availableSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant="outline"
                      onClick={() => handleBookSession(slot)}
                      className="w-full"
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
              <div className="flex items-start gap-3">
                <Video className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Video Consultation</h4>
                  <p className="text-sm text-muted-foreground">
                    All sessions are conducted via secure video call. You'll receive a meeting link 24 hours before your session.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                Session Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                'Monthly 45-min sessions',
                'Expert career strategists',
                'Personalized action plans',
                'Follow-up resources',
                'Priority booking'
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {sessionTopics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">{topic}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>Your scheduled strategy consultations</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingSessions.length > 0 ? (
            <div className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <CalendarIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{session.topic}</h3>
                      <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          {new Date(session.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {session.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {session.consultant}
                        </span>
                        <Badge variant="outline">{session.type}</Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">Join Call</Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No upcoming sessions. Book your first consultation above!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
