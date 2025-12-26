"use client"

import { Card } from "@/components/ui/card"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ScheduleSection() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const dates = Array.from({ length: 35 }, (_, i) => i + 1)

  return (
    <section className="container mx-auto px-4 py-20">
      <div
   
        className="max-w-4xl mx-auto"
      >
        <Card className="p-8 rounded-3xl border-border/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Schedule</h3>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="rounded-xl bg-transparent">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium text-foreground px-4">January 2025</span>
              <Button variant="outline" size="icon" className="rounded-xl bg-transparent">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4 mb-2">
            {days.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-foreground/60">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-4">
            {dates.map((date) => {
              const isToday = date === 15
              const hasEvent = [5, 12, 18, 22, 28].includes(date)

              return (
                <button
                  key={date}
                  className={`aspect-square rounded-2xl flex items-center justify-center text-sm font-medium transition-all hover:bg-muted ${
                    isToday
                      ? "bg-primary text-primary-foreground"
                      : hasEvent
                        ? "bg-accent/20 text-foreground"
                        : "text-foreground/70"
                  }`}
                >
                  {date}
                </button>
              )
            })}
          </div>
        </Card>
      </div>
    </section>
  )
}
