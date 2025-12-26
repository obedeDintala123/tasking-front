"use client";

import { TaskMiniCard } from "@/components/task-dot";
import { useTasks } from "@/lib/requests";

interface CalendarMonthProps {
  currentDate: Date;
}

export function CalendarMonth({ currentDate }: CalendarMonthProps) {
  const { data: tasks } = useTasks();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === month && today.getFullYear() === year;
  const currentDay = today.getDate();

  const days: (number | null)[] = [];

  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }

  for (let day = 1; day <= totalDays; day++) {
    days.push(day);
  }

  const getTasksForDay = (day: number) => {
    return (
      tasks?.filter((task) => {
        const date = new Date(task.startDate);

        return (
          date.getDate() === day &&
          date.getMonth() === month &&
          date.getFullYear() === year
        );
      }) ?? []
    );
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-[#323339] py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const isToday = isCurrentMonth && day === currentDay;
          const tasksForDay = day ? getTasksForDay(day) : [];
          console.log(tasksForDay);
          return (
            <div
              key={index}
              className={`min-h-[100px] md:min-h-[120px] rounded-xl border-2 transition-all ${
                day
                  ? isToday
                    ? "border-[#8098f0] bg-[#8098f0]/5 hover:border-[#8098f0] hover:bg-[#8098f0]/10 cursor-pointer"
                    : "border-gray-100 hover:border-[#8098f0]/40 hover:bg-gray-50/50 cursor-pointer"
                  : "border-transparent"
              }`}
            >
              {day && (
                <div className="p-2 md:p-3 h-full flex flex-col">
                  <div
                    className={`text-sm font-semibold mb-2 ${
                      isToday ? "text-[#8098f0]" : "text-[#323339]"
                    }`}
                  >
                    {day}
                  </div>
                  <div className="flex flex-wrap gap-1 items-start">
                    {tasksForDay.map((task) => (
                      <TaskMiniCard
                        key={task.id}
                        title={task.title}
                        status={task.status}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
