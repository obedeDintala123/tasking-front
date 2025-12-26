"use client"

interface Task {
  id: string
  title: string
  type: "analysis" | "creative" | "meeting" | "default"
  startTime: string
  endTime: string
  description?: string
}

const dummyDayTasks: Task[] = [
  {
    id: "1",
    title: "Morning Standup",
    type: "meeting",
    startTime: "09:00",
    endTime: "09:30",
    description: "Daily team sync",
  },
  {
    id: "2",
    title: "Deep Work - Q4 Analysis",
    type: "analysis",
    startTime: "10:00",
    endTime: "12:00",
    description: "Review quarterly metrics and prepare report",
  },
  {
    id: "3",
    title: "Lunch Break",
    type: "default",
    startTime: "12:00",
    endTime: "13:00",
  },
  {
    id: "4",
    title: "Design Workshop",
    type: "creative",
    startTime: "14:00",
    endTime: "16:00",
    description: "Brainstorming session for new features",
  },
  {
    id: "5",
    title: "Client Call",
    type: "meeting",
    startTime: "16:30",
    endTime: "17:30",
    description: "Project status update",
  },
]

interface CalendarDayProps {
  currentDate: Date
}

export function CalendarDay({ currentDate }: CalendarDayProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i)

  const getTaskPosition = (startTime: string) => {
    const [hours, minutes] = startTime.split(":").map(Number)
    return hours + minutes / 60
  }

  const getTaskHeight = (startTime: string, endTime: string) => {
    const start = getTaskPosition(startTime)
    const [endHours, endMinutes] = endTime.split(":").map(Number)
    const end = endHours + endMinutes / 60
    return end - start
  }

  const getTaskColor = (type: Task["type"]) => {
    switch (type) {
      case "analysis":
        return "bg-[#ffd251]"
      case "creative":
        return "bg-[#f090f1]"
      case "meeting":
        return "bg-[#ff9f69]"
      default:
        return "bg-[#8098f0]"
    }
  }

  const weekDay = currentDate.toLocaleDateString("en-US", { weekday: "long" })
  const monthDay = currentDate.toLocaleDateString("en-US", { month: "long", day: "numeric" })

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Day header */}
      <div className="p-6 border-b-2 border-gray-100">
        <div className="text-sm text-gray-500 mb-1">{weekDay}</div>
        <div className="text-2xl font-bold text-[#323339]">{monthDay}</div>
      </div>

      {/* Timeline */}
      <div className="overflow-y-auto max-h-[700px]">
        <div className="flex">
          {/* Time labels */}
          <div className="w-20 flex-shrink-0">
            {hours.map((hour) => (
              <div key={hour} className="h-20 border-b border-gray-100 px-2 py-1 text-sm text-gray-500">
                {hour.toString().padStart(2, "0")}:00
              </div>
            ))}
          </div>

          {/* Tasks timeline */}
          <div className="flex-1 relative border-l-2 border-gray-200">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-20 border-b border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer"
              ></div>
            ))}

            {/* Tasks overlay */}
            {dummyDayTasks.map((task) => (
              <div
                key={task.id}
                className={`absolute left-2 right-2 md:left-4 md:right-4 rounded-lg p-3 md:p-4 shadow-md hover:shadow-lg transition-all cursor-pointer ${getTaskColor(task.type)}`}
                style={{
                  top: `${getTaskPosition(task.startTime) * 5}rem`,
                  height: `${getTaskHeight(task.startTime, task.endTime) * 5}rem`,
                }}
              >
                <div className="font-semibold text-[#323339] mb-1 text-balance">{task.title}</div>
                <div className="text-xs text-[#323339] opacity-80 mb-2">
                  {task.startTime} - {task.endTime}
                </div>
                {task.description && (
                  <div className="text-xs text-[#323339] opacity-70 text-pretty">{task.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
