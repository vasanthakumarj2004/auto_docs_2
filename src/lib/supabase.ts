import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://evcqrbcbspmronuhdrel.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2Y3FyYmNic3Btcm9udWhkcmVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwMzY4NzAsImV4cCI6MjEwNzYxMjg3MH0.ShhivdlWjaqyiEGYg2RAxpT8Ss1Rk2MhG3eENvxUCz4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
