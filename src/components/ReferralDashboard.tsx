import { useReferrals } from '@/hooks/useReferrals';
import { ReferralProgress } from './referrals/ReferralProgress';
import { ShareReferralLink } from './referrals/ShareReferralLink';
import { InviteByEmail } from './referrals/InviteByEmail';
import { ReferralsList } from './referrals/ReferralsList';

export const ReferralDashboard = () => {
  const { referrals, contestStatus, loading, referralLink, createReferral } = useReferrals();

  const completedReferrals = referrals.filter(r => r.status === 'completed').length;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Referral Contest</h1>
        <p className="text-muted-foreground">
          Invite 5 friends to join and stand a chance to win R1000!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <ReferralProgress
          completedReferrals={completedReferrals}
          totalRequired={5}
          isEligible={contestStatus?.is_eligible || false}
          prizeAmount={contestStatus?.prize_amount?.toString()}
        />
        
        <ShareReferralLink referralLink={referralLink} />
      </div>

      <div className="mb-8">
        <InviteByEmail onInvite={createReferral} />
      </div>

      <ReferralsList referrals={referrals} loading={loading} />
    </div>
  );
};
