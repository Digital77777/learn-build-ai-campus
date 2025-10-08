import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

interface Referral {
  id: string;
  referred_email: string;
  status: string;
  created_at: string;
  completed_at?: string;
}

interface ReferralsListProps {
  referrals: Referral[];
  loading: boolean;
}

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

export const ReferralsList = ({ referrals, loading }: ReferralsListProps) => {
  return (
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
  );
};
