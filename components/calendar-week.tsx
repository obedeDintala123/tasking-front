"use client"

interface Task {
  id: string
  title: string
  type: "analysis" | "creative" | "meeting" | "default"
  startTime: string
  endTime: string
  date: Date
}

const dummyWeekTasks: Task[] = [
  {
    id: "1",
    title: "Morning Standup",
    type: "meeting",
    startTime: "09:00",
    endTime: "09:30",
    date: new Date(2025, 11, 16),
  },
  {
    id: "2",
    title: "Data Analysis",
    type: "analysis",
    startTime: "10:00",
    endTime: "12:00",
    date: new Date(2025, 11, 16),
  },
  {
    id: "3",
    title: "Design Review",
    type: "creative",
    startTime: "14:00",
    endTime: "15:30",
    date: new Date(2025, 11, 17),
  },
  {
    id: "4",
    title: "Team Meeting",
    type: "meeting",
    startTime: "11:00",
    endTime: "12:00",
    date: new Date(2025, 11, 18),
  },
  {
    id: "5",
    title: "Client Presentation",
    type: "meeting",
    startTime: "15:00",
    endTime: "16:00",
    date: new Date(2025, 11, 18),
  },
  {
    id: "6",
    title: "Creative Workshop",
    type: "creative",
    startTime: "10:00",
    endTime: "12:00",
    date: new Date(2025, 11, 19),
  },
  {
    id: "7",
    title: "Budget Review",
    type: "analysis",
    startTime: "13:00",
    endTime: "14:30",
    date: new Date(2025, 11, 19),
  },
]

interface CalendarWeekProps {
  currentDate: Date
}

export function CalendarWeek({ currentDate }: CalendarWeekProps) {
  const getWeekDays = (date: Date) => {
    const curr = new Date(date)
    const first = curr.getDate() - curr.getDay()

    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(curr.setDate(first + i))
      return new Date(day)
    })
  }

  const weekDays = getWeekDays(currentDate)
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const today = new Date()

  const getTasksForDay = (date: Date) => {
    return dummyWeekTasks.filter((task) => task.date.toDateString() === date.toDateString())
  }

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

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Week header */}
      <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b-2 border-gray-100">
        <div className="p-4 border-r border-gray-100"></div>
        {weekDays.map((day, index) => {
          const isToday = day.toDateString() === today.toDateString()
          return (
            <div
              key={index}
              className={`p-4 text-center border-r border-gray-100 last:border-r-0 ${isToday ? "bg-[#8098f0]/5" : ""}`}
            >
              <div className="text-xs font-medium text-gray-500 mb-1">
                {day.toLocaleDateString("en-US", { weekday: "short" })}
              </div>
              <div className={`text-lg font-semibold ${isToday ? "text-[#8098f0]" : "text-[#323339]"}`}>
                {day.getDate()}
              </div>
            </div>
          )
        })}
      </div>

      {/* Time grid */}
      <div className="overflow-y-auto max-h-[600px]">
        <div className="grid grid-cols-[80px_repeat(7,1fr)]">
          {/* Time column */}
          <div>
            {hours.map((hour) => (
              <div key={hour} className="h-16 border-b border-gray-100 px-2 py-1 text-xs text-gray-500">
                {hour.toString().padStart(2, "0")}:00
              </div>
            ))}
          </div>

          {/* Day columns */}
          {weekDays.map((day, dayIndex) => (
            <div key={dayIndex} className="relative border-l border-gray-100">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="h-16 border-b border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer"
                ></div>
              ))}

              {/* Tasks overlay */}
              {getTasksForDay(day).map((task) => (
                <div
                  key={task.id}
                  className={`absolute left-1 right-1 rounded-lg p-2 text-xs font-medium text-[#323339] shadow-sm hover:shadow-md transition-shadow cursor-pointer ${getTaskColor(task.type)}`}
                  style={{
                    top: `${getTaskPosition(task.startTime) * 4}rem`,
                    height: `${getTaskHeight(task.startTime, task.endTime) * 4}rem`,
                  }}
                >
                  <div className="font-semibold text-balance">{task.title}</div>
                  <div className="text-[10px] opacity-80 mt-1">
                    {task.startTime} - {task.endTime}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
