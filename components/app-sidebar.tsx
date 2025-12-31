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
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Clipboard,
  Clock,
  CalendarDays,
  Settings,
  Plus,
  NotebookText,
  UsersRound,
  User2,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useMe } from "@/lib/requests";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import { CreateTeamDialog } from "./create-team-dialog";
import { CreateTaskDialog } from "./create-task-dialog";

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
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [createTask, setCreateTask] = useState(false);
  const [addMember, setAddMember] = useState(false);

  const menuCreateItems = [
    {
      title: "Task",
      icon: NotebookText,
      onclick: () => {
        setAddMember(false);
        setIsOpen(false);
        setCreateTask(true);
      },
    },

    {
      title: "Team",
      icon: UsersRound,
      onclick: () => {
        setAddMember(false);
        setIsOpen(true);
        setCreateTask(false);
      },
    },

    {
      title: "Member",
      icon: User2,
      onclick: () => {
        setAddMember(true);
        setIsOpen(true);
        setCreateTask(false);
      },
    },
  ];

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
            {isMobile ? (
              <SidebarMenu className="gap-2">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => {
                        router.push(item.url);
                        toggleSidebar();
                      }}
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
            ) : (
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
            )}

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center text-white mt-2 gap-2 text-sm w-full p-2 rounded-md bg-tasking-primary-00">
                Create <Plus className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-50 mt-2">
                {menuCreateItems.map((item) => (
                  <DropdownMenuItem key={item.title} onClick={item.onclick}>
                    <div className="flex items-center gap-2">
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 mt-auto">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-2 text-sm "
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </Link>
      </SidebarFooter>

      <CreateTeamDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        addMember={addMember}
      />

      <CreateTaskDialog open={createTask} setOpen={setCreateTask} />
    </Sidebar>
  );
}
