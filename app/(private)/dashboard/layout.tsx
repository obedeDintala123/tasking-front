import type { Metadata } from "next";
import "../../globals.css";
import { Providers } from "@/hooks/provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Tasking - Dashboard",
  description: "Manage your taks with Tasking",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 bg-tasking-background">
          <AppHeader />
          <div className="p-4 md:p-8">
            <Providers>{children}</Providers>
          </div>
        </main>
      </SidebarProvider>
      <Toaster />
    </div>
  );
}
