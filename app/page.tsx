import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { ScheduleSection } from "@/components/schedule-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ScheduleSection />
      </main>
      <footer className="border-t py-12 mt-20">
        <div className="container mx-auto px-4 text-center text-foreground/60">
          <p className="text-sm">© 2025 Tasking. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
