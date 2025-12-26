"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Clipboard,
  Clock,
  CalendarDays,
  Settings,
  Send,
  ArrowUpRight,
  MessageCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMe } from "@/lib/requests";
import Link from "next/link";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
    isActive: true,
  },
  {
    title: "My board",
    icon: Clipboard,
    url: "/dashboard/my-board",
  },
  {
    title: "Timeline",
    icon: Clock,
    url: "/dashboard/timeline",
  },
  {
    title: "Schedule",
    icon: CalendarDays,
    url: "/dashboard/schedule",
  },
];

export function AppSidebar() {
  const router = useRouter();
  const { data: user } = useMe();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border p-4">
        <span className="font-semibold text-lg">
          Task<span className="text-tasking-primary-00">ing</span>
        </span>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup className="pt-6 pb-4">
          <div className="space-y-1 mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-1">
              Hello <span className="text-2xl">👋</span> {user?.firstName}
            </h2>
            <p className="text-sm text-muted-foreground">
              Let&apos;s do a great job today{" "}
              <span className="text-base">👀</span>
            </p>
          </div>

          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => router.push(item.url)}
                    isActive={item.isActive}
                    className={
                      item.isActive
                        ? "bg-gray-900 text-white hover:bg-gray-900 hover:text-white"
                        : "hover:bg-gray-100"
                    }
                  >
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
              
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 mt-auto">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
