-- Drop forex trading tables in correct order due to foreign key constraints

-- Drop tables that reference trading_accounts first
DROP TABLE IF EXISTS public.bot_status CASCADE;
DROP TABLE IF EXISTS public.trade_history CASCADE;
DROP TABLE IF EXISTS public.trading_parameters CASCADE;

-- Drop the main trading_accounts table
DROP TABLE IF EXISTS public.trading_accounts CASCADE;

-- Drop currency_pairs table
DROP TABLE IF EXISTS public.currency_pairs CASCADE;

-- Keep the profiles table as it's useful for user data