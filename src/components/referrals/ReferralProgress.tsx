import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Gift } from 'lucide-react';

interface ReferralProgressProps {
  completedReferrals: number;
  totalRequired: number;
  isEligible: boolean;
  prizeAmount?: string;
}

export const ReferralProgress = ({ 
  completedReferrals, 
  totalRequired, 
  isEligible, 
  prizeAmount 
}: ReferralProgressProps) => {
  const progressPercentage = (completedReferrals / totalRequired) * 100;
  const remaining = totalRequired - completedReferrals;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Contest Progress
        </CardTitle>
        <CardDescription>
          {completedReferrals} out of {totalRequired} referrals completed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={progressPercentage} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{completedReferrals}/{totalRequired} completed</span>
            <span>{remaining} remaining</span>
          </div>
          {isEligible && prizeAmount && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <Gift className="h-4 w-4 text-green-600" />
              <span className="text-green-700 font-medium">
                Congratulations! You're eligible to win R{prizeAmount}!
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
