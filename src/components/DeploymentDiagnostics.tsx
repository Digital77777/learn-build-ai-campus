import { useEffect } from 'react';

/**
 * Deployment Diagnostics Component
 * Runs on app startup to detect configuration issues in production
 */
export const DeploymentDiagnostics = () => {
  useEffect(() => {
    // Only run diagnostics in production
    if (import.meta.env.DEV) return;

    console.group('🔍 Deployment Diagnostics');
    
    // Check environment
    console.log('Environment:', import.meta.env.MODE);
    console.log('Base URL:', import.meta.env.BASE_URL);
    
    // Check critical env vars
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const huggingFaceKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
    
    console.log('✅ Supabase URL:', supabaseUrl ? 'Configured' : '❌ MISSING');
    console.log('✅ Supabase Key:', supabaseKey ? 'Configured' : '❌ MISSING');
    console.log('⚠️ HuggingFace Key:', huggingFaceKey ? 'Configured' : 'Not set (optional)');
    
    // Check if we're in a valid deployment environment
    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ CRITICAL: Missing required environment variables!');
      console.error('Set these in Vercel Dashboard → Settings → Environment Variables:');
      console.error('- VITE_SUPABASE_URL');
      console.error('- VITE_SUPABASE_ANON_KEY');
      console.error('See DEPLOYMENT.md for full deployment guide.');
    } else {
      console.log('✅ All critical environment variables configured');
    }
    
    // Check routing
    console.log('Current route:', window.location.pathname);
    
    // Check if assets can load
    const testImage = new Image();
    testImage.onerror = () => {
      console.warn('⚠️ Asset loading may have issues - check public directory');
    };
    testImage.src = '/icons/favicon-196.png';
    
    console.groupEnd();
  }, []);

  return null;
};
