import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { getContactMessages } from "@/features/contact/queries";
import { formatDateTime } from "@/lib/format";

export const metadata: Metadata = { title: "Messages" };

export default async function MessagesPage() {
  const messages = await getContactMessages();

  return (
    <>
      <PageHeader title="Messages" />
      {messages.length === 0 ? (
        <p className="py-8 text-center text-muted-foreground">
          No messages yet. Messages sent from the contact page appear here.
        </p>
      ) : (
        <ul className="max-w-3xl space-y-4">
          {messages.map((m) => (
            <li key={m.id} className="rounded-lg border p-4 shadow-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-semibold">{m.name}</p>
                <time
                  dateTime={m.created_at}
                  className="text-xs text-muted-foreground"
                >
                  {formatDateTime(m.created_at)}
                </time>
              </div>
              <p className="text-sm">
                <a href={`mailto:${m.email}`} className="underline">
                  {m.email}
                </a>
                {m.phone && (
                  <>
                    {" · "}
                    <a href={`tel:${m.phone}`} className="underline">
                      {m.phone}
                    </a>
                  </>
                )}
              </p>
              <p className="mt-3 whitespace-pre-line">{m.message}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
