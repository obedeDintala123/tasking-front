"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { DashboardMockup } from "./dashboard-mockup";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const router = useRouter();
  return (
    <section className="container mx-auto px-4 pt-20 pb-12 lg:pt-32 lg:pb-20">
      <div className="flex flex-col items-center text-center">
        <div className="space-y-6">
          <h1 className="font-sans text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
            Manage Your Time with Precision
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70 sm:text-xl text-balance">
            The modern task management solution that helps you stay organized,
            productive, and in control of your workflow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => router.push("/auth/login")}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 text-base rounded-2xl"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 h-12 text-base rounded-2xl bg-transparent"
            >
              Watch Demo
            </Button>
          </div>
        </div>

        <div className="mt-16 w-full max-w-6xl">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
