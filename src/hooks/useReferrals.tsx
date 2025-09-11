import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Referral {
  id: string;
  referred_email: string;
  referral_code: string;
  status: 'pending' | 'completed' | 'expired';
  created_at: string;
  completed_at?: string;
}

interface ReferralContest {
  id: string;
  referral_count: number;
  is_eligible: boolean;
  contest_entry_date?: string;
  prize_amount: number;
  prize_currency: string;
}

export const useReferrals = () => {
  const { user } = useAuth();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [contestStatus, setContestStatus] = useState<ReferralContest | null>(null);
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState<string>('');

  const fetchReferrals = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReferrals((data || []) as Referral[]);
    } catch (error) {
      console.error('Error fetching referrals:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContestStatus = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('referral_contests')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setContestStatus(data);
    } catch (error) {
      console.error('Error fetching contest status:', error);
    }
  };

  const generateReferralCode = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase.rpc('generate_referral_code');
      if (error) throw error;
      setReferralCode(data);
      return data;
    } catch (error) {
      console.error('Error generating referral code:', error);
      return null;
    }
  };

  const createReferral = async (email: string) => {
    if (!user || !referralCode) return { error: 'Missing user or referral code' };

    try {
      const { data, error } = await supabase
        .from('referrals')
        .insert({
          referrer_id: user.id,
          referred_email: email,
          referral_code: referralCode,
        })
        .select()
        .single();

      if (error) throw error;
      await fetchReferrals();
      return { data, error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  };

  const getReferralLink = () => {
    if (!referralCode) return '';
    return `${window.location.origin}/auth?ref=${referralCode}`;
  };

  useEffect(() => {
    if (user) {
      fetchReferrals();
      fetchContestStatus();
      generateReferralCode();
    }
  }, [user]);

  return {
    referrals,
    contestStatus,
    loading,
    referralCode,
    referralLink: getReferralLink(),
    createReferral,
    fetchReferrals,
    generateReferralCode,
  };
};