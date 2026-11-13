import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bnvnjuqsekqwqmoiqvcl.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJudm5qdXFzZWtxd3Ftb2lxdmNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ1NzgyNzMsImV4cCI6MjExMDE1NDI3M30.2oPn0x5HMVkj8_5TYpHEDAL11RCBEoCeKth2Z--kJ4s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
