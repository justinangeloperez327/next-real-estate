"use client";

import * as React from "react";
import { BuildingIcon, HomeIcon, LogOutIcon } from "lucide-react";

import { NavMain } from "@/components/nav-main";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { signOutAction } from "@/app/actions";
import { Button } from "./ui/button";

const items = [
  {
    name: "Dashboard",
    url: "/dashboard",
    href: "/dashboard",
    label: "Dashboard",
    icon: HomeIcon,
  },
  {
    name: "Properties",
    url: "/dashboard/properties",
    href: "/dashboard/properties",
    label: "Properties",
    icon: BuildingIcon,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  console.log(props);
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <form action={signOutAction}>
                  <SidebarMenuButton type="submit">
                    <LogOutIcon />
                    Sign out
                  </SidebarMenuButton>
                </form>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
