import type { Metadata } from "next";
import { AppSidebar } from "@/components/layout/app-sidebar";
import Breadcrumbs from "@/components/layout/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Suspense } from "react";
import { requireAdmin } from "@/features/auth/session";
import { TableSkeleton } from "@/features/properties/components/property-skeletons";

export const metadata: Metadata = {
  title: { template: "%s · Dashboard", default: "Dashboard" },
  robots: { index: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The session check reads cookies, so it runs at request time inside a
  // Suspense boundary; nothing under /dashboard is prerendered for visitors.
  return (
    <Suspense fallback={<AdminFallback />}>
      <AdminShell>{children}</AdminShell>
    </Suspense>
  );
}

function AdminFallback() {
  return (
    <div className="p-8">
      <TableSkeleton />
    </div>
  );
}

async function AdminShell({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();

  return (
    <SidebarProvider>
      <AppSidebar email={session.email} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
