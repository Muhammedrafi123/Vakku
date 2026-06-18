import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && key);
export const supabase = isSupabaseConfigured ? createClient(url!, key!) : null;

export type Comment = {
  id: string;
  promise_id: string;
  user_id: string;
  user_name: string;
  body: string;
  created_at: string;
};

export type Submission = {
  id: string;
  promise_id: string;
  user_id: string;
  user_name: string;
  source_url: string;
  note: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};
