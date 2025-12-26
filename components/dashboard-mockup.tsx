"use client"

import { Card } from "@/components/ui/card"

export function DashboardMockup() {
  return (
    <Card className="p-8 shadow-2xl rounded-3xl border-border/50">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Timeline Grid */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Timeline</h3>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, i) => {
              const intensity = Math.random()
              let bgColor = "bg-muted"
              if (intensity > 0.7) bgColor = "bg-[#8098f0]"
              else if (intensity > 0.5) bgColor = "bg-[#f090f1]"
              else if (intensity > 0.3) bgColor = "bg-[#ffd251]"
              else if (intensity > 0.15) bgColor = "bg-[#ff9f69]"

              return <div key={i} className={`aspect-square rounded-lg ${bgColor} transition-all hover:scale-110`} />
            })}
          </div>
          <div className="flex items-center justify-between text-xs text-foreground/60">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Task Analysis */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Task Analysis</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-foreground/70 w-20">Design</span>
              <div className="flex-1 h-8 bg-[#f090f1] rounded-xl" style={{ width: "85%" }} />
              <span className="text-sm font-medium text-foreground">85%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-foreground/70 w-20">Dev</span>
              <div className="flex-1 h-8 bg-[#ffd251] rounded-xl" style={{ width: "92%" }} />
              <span className="text-sm font-medium text-foreground">92%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-foreground/70 w-20">Testing</span>
              <div className="flex-1 h-8 bg-[#ff9f69] rounded-xl" style={{ width: "67%" }} />
              <span className="text-sm font-medium text-foreground">67%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-foreground/70 w-20">Review</span>
              <div className="flex-1 h-8 bg-[#8098f0] rounded-xl" style={{ width: "78%" }} />
              <span className="text-sm font-medium text-foreground">78%</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
