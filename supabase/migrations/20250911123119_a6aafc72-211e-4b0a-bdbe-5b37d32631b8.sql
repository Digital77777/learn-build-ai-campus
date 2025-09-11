-- Create referrals table to track invitations
CREATE TABLE public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_email TEXT NOT NULL,
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  referral_code TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'expired')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(referrer_id, referred_email)
);

-- Create referral_contests table to track contest entries
CREATE TABLE public.referral_contests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_count INTEGER NOT NULL DEFAULT 0,
  is_eligible BOOLEAN NOT NULL DEFAULT false,
  contest_entry_date TIMESTAMP WITH TIME ZONE,
  prize_amount NUMERIC DEFAULT 1000.00,
  prize_currency TEXT DEFAULT 'ZAR',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_contests ENABLE ROW LEVEL SECURITY;

-- RLS policies for referrals
CREATE POLICY "Users can view their own referrals" 
ON public.referrals 
FOR SELECT 
USING (auth.uid() = referrer_id);

CREATE POLICY "Users can create their own referrals" 
ON public.referrals 
FOR INSERT 
WITH CHECK (auth.uid() = referrer_id);

CREATE POLICY "Users can update their own referrals" 
ON public.referrals 
FOR UPDATE 
USING (auth.uid() = referrer_id);

-- RLS policies for referral_contests
CREATE POLICY "Users can view their own contest status" 
ON public.referral_contests 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own contest entry" 
ON public.referral_contests 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contest entry" 
ON public.referral_contests 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Function to generate unique referral code
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TEXT AS $$
BEGIN
    RETURN UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
END;
$$ LANGUAGE plpgsql;

-- Function to update referral contest status
CREATE OR REPLACE FUNCTION public.update_referral_contest_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Update or insert contest entry when referral is completed
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        INSERT INTO public.referral_contests (user_id, referral_count, is_eligible, contest_entry_date)
        VALUES (
            NEW.referrer_id,
            1,
            false,
            CASE WHEN 1 >= 5 THEN now() ELSE NULL END
        )
        ON CONFLICT (user_id) DO UPDATE SET
            referral_count = referral_contests.referral_count + 1,
            is_eligible = CASE WHEN referral_contests.referral_count + 1 >= 5 THEN true ELSE false END,
            contest_entry_date = CASE 
                WHEN referral_contests.referral_count + 1 >= 5 AND referral_contests.contest_entry_date IS NULL 
                THEN now() 
                ELSE referral_contests.contest_entry_date 
            END,
            updated_at = now();
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to update contest status
CREATE TRIGGER update_referral_contest_trigger
    AFTER UPDATE ON public.referrals
    FOR EACH ROW
    EXECUTE FUNCTION public.update_referral_contest_status();

-- Function to handle new user signup from referral
CREATE OR REPLACE FUNCTION public.handle_referral_signup()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if this user was referred and update the referral
    UPDATE public.referrals 
    SET 
        referred_user_id = NEW.id,
        status = 'completed',
        completed_at = now()
    WHERE referred_email = NEW.email AND status = 'pending';
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to handle referral completion on user signup
CREATE TRIGGER handle_referral_signup_trigger
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_referral_signup();

-- Add updated_at trigger for referral_contests
CREATE TRIGGER update_referral_contests_updated_at
    BEFORE UPDATE ON public.referral_contests
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();