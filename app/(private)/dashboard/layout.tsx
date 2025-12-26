import type { Metadata } from "next";
import "../../globals.css";
import DashboardClientLayout from "@/components/dashboard-client-layout";

export const metadata: Metadata = {
  title: "Tasking - Dashboard",
  description: "Manage your taks with Tasking",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardClientLayout>{children}</DashboardClientLayout>;
}
