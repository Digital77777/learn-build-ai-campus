import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareReferralLinkProps {
  referralLink: string;
}

export const ShareReferralLink = ({ referralLink }: ShareReferralLinkProps) => {
  const { toast } = useToast();

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

  return (
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
  );
};
