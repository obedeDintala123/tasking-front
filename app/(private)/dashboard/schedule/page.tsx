"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarMonth } from "@/components/calendar-month";
import { CalendarWeek } from "@/components/calendar-week";
import { CalendarDay } from "@/components/calendar-day";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  SlidersHorizontal,
} from "lucide-react";
import { CreateTaskDialog } from "@/components/create-task-dialog";

type ViewType = "month" | "week" | "day";

export default function SchedulePage() {
  const [open, setOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-[#323339]">Schedule</h1>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateMonth("prev")}
                  className="p-1 hover:bg-white/60 rounded-lg transition-colors"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-5 h-5 text-[#323339]" />
                </button>
                <span className="text-lg font-medium text-[#323339] min-w-[180px] text-center">
                  {monthNames[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear()}
                </span>
                <button
                  onClick={() => navigateMonth("next")}
                  className="p-1 hover:bg-white/60 rounded-lg transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-5 h-5 text-[#323339]" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="border-gray-200 hover:bg-white bg-transparent"
              >
                <Filter className="w-4 h-4 text-[#323339]" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-gray-200 hover:bg-white bg-transparent"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#323339]" />
              </Button>
              <Button
                onClick={() => setOpen(true)}
                className="bg-[#8098f0] hover:bg-[#6b82e6] text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>
          </div>

          {/* View Switcher */}
          <div className="flex gap-2 bg-white p-1 rounded-xl shadow-sm w-fit">
            <button
              onClick={() => setCurrentView("month")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                currentView === "month"
                  ? "bg-[#8098f0] text-white"
                  : "text-[#323339] hover:bg-gray-50"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setCurrentView("week")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                currentView === "week"
                  ? "bg-[#8098f0] text-white"
                  : "text-[#323339] hover:bg-gray-50"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setCurrentView("day")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                currentView === "day"
                  ? "bg-[#8098f0] text-white"
                  : "text-[#323339] hover:bg-gray-50"
              }`}
            >
              Day
            </button>
          </div>
        </div>

        <CreateTaskDialog open={open} setOpen={setOpen} isEditing={false} />

        {/* Calendar Views */}
        {currentView === "month" && <CalendarMonth currentDate={currentDate} />}
        {currentView === "week" && <CalendarWeek currentDate={currentDate} />}
        {currentView === "day" && <CalendarDay currentDate={currentDate} />}
      </div>
    </div>
  );
}
