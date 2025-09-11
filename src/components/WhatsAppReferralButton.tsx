import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useReferrals } from '@/hooks/useReferrals';
import { Card, CardContent } from '@/components/ui/card';

export const WhatsAppReferralButton = () => {
  const { user } = useAuth();
  const { referralLink, referralCode } = useReferrals();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show button after a delay and only if user is authenticated
  useEffect(() => {
    if (user && referralCode) {
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [user, referralCode]);

  if (!isVisible || !user || !referralLink) return null;

  const whatsappMessage = encodeURIComponent(
    `🎉 Join me on Digital Intelligence Marketplace and help me win R1,000! \n\n` +
    `Sign up using my referral link and be part of the AI revolution: ${referralLink}\n\n` +
    `✨ Get access to:\n` +
    `• AI Learning Paths\n` +
    `• Advanced AI Tools\n` +
    `• AI Marketplace\n` +
    `• Community Support\n\n` +
    `Join now and let's learn AI together! 🚀`
  );

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsExpanded(false);
  };

  const handleDirectShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join me and win R1000!',
        text: 'Sign up using my referral link and help me win R1000 in the referral contest!',
        url: referralLink,
      });
    } else {
      navigator.clipboard.writeText(referralLink);
    }
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded && (
        <Card className="mb-4 w-80 shadow-lg border-green-200 animate-scale-in">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-green-700">Share & Win R1,000!</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Invite 5 friends to join and stand a chance to win R1,000!
            </p>
            <div className="space-y-2">
              <Button
                onClick={handleWhatsAppShare}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                size="sm"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Share on WhatsApp
              </Button>
              <Button
                onClick={handleDirectShare}
                variant="outline"
                className="w-full"
                size="sm"
              >
                Copy Link
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
        size="sm"
      >
        {isExpanded ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};