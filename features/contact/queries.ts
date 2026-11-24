import "server-only";
import { requireAdmin } from "@/features/auth/session";
import { createClient } from "@/lib/supabase/server";

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
};

/** Newest first. Admin-only (enforced here and by row-level security). */
export async function getContactMessages(
  limit = 100,
): Promise<ContactMessage[]> {
  await requireAdmin();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(`Failed to load messages: ${error.message}`);
  return (data ?? []) as ContactMessage[];
}
