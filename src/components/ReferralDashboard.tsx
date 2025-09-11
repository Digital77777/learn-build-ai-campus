import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Copy, Share2, Gift, Users, Trophy, Mail } from 'lucide-react';
import { useReferrals } from '@/hooks/useReferrals';
import { useToast } from '@/hooks/use-toast';

export const ReferralDashboard = () => {
  const { referrals, contestStatus, loading, referralLink, createReferral } = useReferrals();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  const completedReferrals = referrals.filter(r => r.status === 'completed').length;
  const progressPercentage = (completedReferrals / 5) * 100;

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast({
        title: "Link copied!",
        description: "Your referral link has been copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link. Please try again.",
        variant: "destructive",
      });
    }
  };

  const shareReferralLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join me and win R1000!',
          text: 'Sign up using my referral link and help me win R1000 in the referral contest!',
          url: referralLink,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      copyReferralLink();
    }
  };

  const handleInviteByEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsInviting(true);
    try {
      const result = await createReferral(email);
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-500">Joined</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'expired':
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Referral Contest</h1>
        <p className="text-muted-foreground">
          Invite 5 friends to join and stand a chance to win R1000!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {/* Progress Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Contest Progress
            </CardTitle>
            <CardDescription>
              {completedReferrals} out of 5 referrals completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={progressPercentage} className="w-full" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{completedReferrals}/5 completed</span>
                <span>{5 - completedReferrals} remaining</span>
              </div>
              {contestStatus?.is_eligible && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <Gift className="h-4 w-4 text-green-600" />
                  <span className="text-green-700 font-medium">
                    Congratulations! You're eligible to win R{contestStatus.prize_amount}!
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Share Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-primary" />
              Share Your Link
            </CardTitle>
            <CardDescription>
              Share your unique referral link with friends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  value={referralLink} 
                  readOnly 
                  className="flex-1 text-sm"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyReferralLink}
                  className="px-3"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                onClick={shareReferralLink} 
                className="w-full"
                variant="default"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Link
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invite by Email */}
      <Card className="mb-8">
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

      {/* Referrals List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Your Referrals ({referrals.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4 text-muted-foreground">
              Loading referrals...
            </div>
          ) : referrals.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No referrals yet</p>
              <p className="text-sm">Start sharing your link to invite friends!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {referrals.map((referral) => (
                <div 
                  key={referral.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium">{referral.referred_email}</p>
                    <p className="text-sm text-muted-foreground">
                      Invited {new Date(referral.created_at).toLocaleDateString()}
                      {referral.completed_at && (
                        <span> • Joined {new Date(referral.completed_at).toLocaleDateString()}</span>
                      )}
                    </p>
                  </div>
                  {getStatusBadge(referral.status)}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};