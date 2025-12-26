"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useRouter } from "next/navigation"

export function Header() {

  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-8">
          <div className="text-2xl font-bold text-foreground">
            Task<span className="text-primary">ing</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Pricing
            </a>
            <a href="#about" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
              About
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={() => router.push("/auth/login")} variant="ghost" className="hidden md:inline-flex">
            Sign In
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Get Started</Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
