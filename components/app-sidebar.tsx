"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BuildingIcon, HomeIcon, LogOutIcon } from "lucide-react";
import { signOutAction } from "@/app/actions";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items: { name: string; href: Route; icon: typeof HomeIcon }[] = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Properties", href: "/dashboard/properties", icon: BuildingIcon },
];

export function AppSidebar({ email }: { email?: string }) {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.href === "/dashboard"
                        ? pathname === item.href
                        : pathname.startsWith(item.href)
                    }
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {email && (
          <p className="truncate px-2 text-xs text-sidebar-foreground/70">
            {email}
          </p>
        )}
        <SidebarMenu>
          <SidebarMenuItem>
            <form action={signOutAction}>
              <SidebarMenuButton type="submit">
                <LogOutIcon />
                Sign out
              </SidebarMenuButton>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
