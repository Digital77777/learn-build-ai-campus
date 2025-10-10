import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { HeadphonesIcon, MessageSquare, Phone, Mail, Clock, Crown, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function SupportPage() {
  const { toast } = useToast();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Your priority support request has been received. We'll respond within 15 minutes.",
    });
    setSubject('');
    setMessage('');
  };

  const supportChannels = [
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Instant messaging with our support team',
      availability: 'Available 24/7',
      action: 'Start Chat'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Direct line to your account manager',
      availability: 'Mon-Fri 8AM-8PM',
      action: 'Call Now'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Detailed support via email',
      availability: 'Response within 15 min',
      action: 'Send Email'
    }
  ];

  const accountManager = {
    name: 'Sarah Johnson',
    role: 'Senior Account Manager',
    email: 'sarah.johnson@platform.com',
    phone: '+27 11 123 4567'
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex items-center gap-3 mb-8">
        <HeadphonesIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Priority Support</h1>
          <p className="text-muted-foreground">24/7 dedicated support with personal account manager</p>
        </div>
        <Badge variant="default" className="ml-auto">Career Tier</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>Submit a priority support request and get a response within 15 minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea
                  id="message"
                  placeholder="Please provide details about your inquiry or issue..."
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Average response time: 12 minutes</span>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Send Priority Request
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                Your Account Manager
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground">
                  SJ
                </div>
                <div>
                  <p className="font-semibold">{accountManager.name}</p>
                  <p className="text-sm text-muted-foreground">{accountManager.role}</p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{accountManager.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{accountManager.phone}</span>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Schedule Call
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Priority Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                '24/7 availability',
                'Sub-15 min response',
                'Direct manager access',
                'Phone support included',
                'Proactive monitoring'
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Support Channels</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <Card key={channel.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Icon className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>{channel.title}</CardTitle>
                  <CardDescription>{channel.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{channel.availability}</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    {channel.action}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
