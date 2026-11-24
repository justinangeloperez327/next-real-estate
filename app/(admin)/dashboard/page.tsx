import Link from "next/link";
import { connection } from "next/server";
import { ArrowRightIcon } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { getContactMessageStats } from "@/features/contact/queries";
import { formatDateTime } from "@/lib/format";

// Page pattern: Dashboard (summary tiles + recent activity).
export default async function DashboardPage() {
  await connection(); // admin views always render at request time
  const { messages, thisWeek } = await getContactMessageStats();

  const stats = [
    { label: "Messages this week", value: thisWeek },
    { label: "Messages (last 100)", value: messages.length },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Enquiries from the site. Listings come from Realtor.com via RealtyAPI."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-card p-6">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold">Latest messages</h2>
          <Link
            href="/dashboard/messages"
            className="inline-flex h-11 items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            View all <ArrowRightIcon aria-hidden className="size-4" />
          </Link>
        </div>
        {messages.length === 0 ? (
          <p className="rounded-xl border bg-card px-6 py-10 text-center text-sm text-muted-foreground">
            No messages yet. They appear here when someone uses the contact
            form.
          </p>
        ) : (
          <ul className="divide-y rounded-xl border bg-card">
            {messages.slice(0, 5).map((m) => (
              <li key={m.id} className="px-5 py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium">{m.name}</p>
                  <time
                    dateTime={m.created_at}
                    className="text-xs text-muted-foreground"
                  >
                    {formatDateTime(m.created_at)}
                  </time>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {m.message}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
