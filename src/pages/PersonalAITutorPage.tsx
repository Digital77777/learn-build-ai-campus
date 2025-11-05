import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, User, ShieldAlert } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useSubscription } from '@/hooks/useSubscription';
import { LoadingScreen } from '@/components/LoadingScreen';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

export const PersonalAITutorPage = () => {
  const { hasAITutorAccess, loading: subscriptionLoading } = useSubscription();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-tutor', {
        body: { query: input },
      });

      if (error) throw error;

      const aiMessage: Message = { text: data.reply, sender: 'ai' };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      toast.error('Error contacting AI tutor: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (subscriptionLoading) {
    return <LoadingScreen />;
  }

  if (!hasAITutorAccess) {
    return (
      <div className="container mx-auto max-w-3xl py-8 text-center">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <ShieldAlert className="h-8 w-8 text-destructive" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The Personal AI Tutor is a premium feature. Please upgrade to the
              Career tier to get access.
            </p>
            <Button className="mt-4">Upgrade Subscription</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot /> Personal AI Tutor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 h-96 overflow-y-auto pr-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  msg.sender === 'user' ? 'justify-end' : ''
                }`}
              >
                {msg.sender === 'ai' && (
                  <Bot className="h-8 w-8 text-primary" />
                )}
                <div
                  className={`rounded-lg px-4 py-2 ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === 'user' && <User className="h-8 w-8" />}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your AI tutor anything..."
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Thinking...' : 'Send'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalAITutorPage;
