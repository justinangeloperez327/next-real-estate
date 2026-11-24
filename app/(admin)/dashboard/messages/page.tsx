import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { getContactMessages } from "@/features/contact/queries";
import { formatDateTime } from "@/lib/format";

export const metadata: Metadata = { title: "Messages" };

export default async function MessagesPage() {
  const messages = await getContactMessages();

  return (
    <>
      <PageHeader
        title="Messages"
        description="Enquiries sent from the contact page, newest first."
      />
      {messages.length === 0 ? (
        <div className="rounded-xl border bg-card px-6 py-16 text-center">
          <h2 className="font-semibold">No messages yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            When someone uses the contact form, their message appears here.
          </p>
          <Button asChild variant="outline" className="mt-6">
            <Link href="/contact">View the contact page</Link>
          </Button>
        </div>
      ) : (
        <ul className="max-w-3xl space-y-4">
          {messages.map((m) => (
            <li key={m.id} className="rounded-xl border bg-card p-5">
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
