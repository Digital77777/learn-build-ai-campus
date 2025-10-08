import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InviteByEmailProps {
  onInvite: (email: string) => Promise<{ error?: string }>;
}

export const InviteByEmail = ({ onInvite }: InviteByEmailProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  const handleInviteByEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsInviting(true);
    try {
      const result = await onInvite(email);
      if (result?.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Invitation sent!",
          description: `Invitation sent to ${email}`,
        });
        setEmail('');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsInviting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          Invite by Email
        </CardTitle>
        <CardDescription>
          Send a direct invitation to someone's email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleInviteByEmail} className="flex gap-2">
          <Input
            type="email"
            placeholder="friend@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            required
          />
          <Button 
            type="submit" 
            disabled={isInviting || !email}
            className="px-6"
          >
            {isInviting ? 'Sending...' : 'Invite'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
