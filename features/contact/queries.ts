import "server-only";
import { requireAdmin } from "@/features/auth/session";
import { getDb } from "@/lib/prisma";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
};

/** Newest first. Admin-only (authorized before the database read). */
export async function getContactMessages(
  limit = 100,
): Promise<ContactMessage[]> {
  await requireAdmin();
  const rows = await getDb().contactMessage.findMany({
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit,
  });
  return rows.map(({ id, createdAt, ...fields }) => ({
    ...fields,
    id: id.toString(),
    created_at: createdAt.toISOString(),
  }));
}

/** Counts for the dashboard, computed at request time. */
export async function getContactMessageStats() {
  const messages = await getContactMessages(100);
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return {
    messages,
    thisWeek: messages.filter(
      (m) => new Date(m.created_at).getTime() >= weekAgo,
    ).length,
  };
}
