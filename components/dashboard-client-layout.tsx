"use client";

import { useMe } from "@/lib/requests";
import { Loading } from "./loading";
import { Providers } from "@/hooks/provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useMe();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 bg-tasking-background">
          <AppHeader />
          <div className="p-8">
            <Providers>{children}</Providers>
          </div>
        </main>
      </SidebarProvider>
      <Toaster />
    </div>
  );
}
