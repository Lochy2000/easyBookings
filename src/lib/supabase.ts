
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anonymous Key');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Database types
export type Booking = {
  id: string;
  created_at: string;
  date: string;
  time: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  notes?: string;
  status: 'confirmed' | 'cancelled' | 'completed';
}

export type TimeSlot = {
  id: string;
  date: string;
  time: string;
  available: boolean;
}
