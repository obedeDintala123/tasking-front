"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Calendar, ChevronRight, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTasks } from "@/lib/requests";
import { Priority, Task } from "@/types/types";
import { CreateTaskDialog } from "@/components/create-task-dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { labels } from "@/lib/utils";

const hours = Array.from({ length: 24 }, (_, i) => i);

export default function TimelinePage() {
  const [open, setOpen] = useState(false);
  const { data: tasks = [] } = useTasks();
  const [viewMode, setViewMode] = useState<"day" | "week">("day");
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  const HOUR_HEIGHT = 80;

  const currentTimeOffset =
    currentHour * HOUR_HEIGHT + (currentMinute / 60) * HOUR_HEIGHT;

  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return currentTime.toLocaleDateString("en-US", options);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Header */}
      <Card className="bg-white p-4 rounded-md">
        <CardContent>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-[#323339]">
                  Timeline
                </h1>
                <p className="text-sm text-gray-500 mt-1">{formatDate()}</p>
              </div>

              <div className="flex items-center gap-3">
                {/* View Switcher */}
                <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode("day")}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      viewMode === "day"
                        ? "bg-white text-[#323339] shadow-sm"
                        : "text-gray-600 hover:text-[#323339]"
                    }`}
                  >
                    Day
                  </button>
                  <button
                    onClick={() => setViewMode("week")}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      viewMode === "week"
                        ? "bg-white text-[#323339] shadow-sm"
                        : "text-gray-600 hover:text-[#323339]"
                    }`}
                  >
                    Week
                  </button>
                </div>

                {/* Filter Button */}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 bg-transparent"
                >
                  <Filter className="h-4 w-4" />
                </Button>

                {/* Calendar Button */}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 bg-transparent"
                >
                  <Calendar className="h-4 w-4" />
                </Button>

                {/* Add Task Button */}
                <Button
                  onClick={() => setOpen(true)}
                  className="bg-[#8098f0] hover:bg-[#6a82e0] text-white shadow-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Content */}
      <div className="max-w-7xl mx-auto py-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex">
            {/* Time Scale */}
            <div className="w-20 flex-shrink-0 border-r border-gray-200">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="h-[80px] flex items-start justify-end pr-3 pt-2 text-sm font-medium text-[#323339] border-b border-gray-100"
                >
                  {String(hour).padStart(2, "0")}:00
                </div>
              ))}
            </div>

            {/* Timeline Grid */}
            <div className="flex-1 relative">
              {/* Hour Grid Lines */}
              {hours.map((hour, index) => (
                <div
                  key={hour}
                  className="h-20 border-b border-gray-100"
                  style={{
                    backgroundColor: index % 2 === 0 ? "#fafafa" : "#ffffff",
                  }}
                />
              ))}

              {/* Current Time Indicator */}
              {currentHour >= 0 && currentHour <= 24 && (
                <div
                  className="absolute left-0 right-0 h-0.5 bg-[#8098f0] z-10"
                  style={{ top: `${currentTimeOffset}%` }}
                >
                  <div className="absolute -left-1 -top-1.5 w-3 h-3 bg-[#8098f0] rounded-full" />
                </div>
              )}

              {/* Task Blocks */}
              {tasks.map((task) => (
                <TaskBlock key={task.id} task={task} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <CreateTaskDialog open={open} setOpen={setOpen} isEditing={false} />
    </div>
  );
}

function TaskBlock({ task }: { task: Task }) {
  // Calculate position and height
  const HOUR_HEIGHT = 80;

  const [hours, minutes] = task.startHour.split(":").map(Number);

  const startOffset = hours * HOUR_HEIGHT + (minutes / 60) * HOUR_HEIGHT;

  function calculateDuration(startHour: string, endHour: string): number {
    const [sh, sm, ss] = startHour.split(":").map(Number);
    const [eh, em, es] = endHour.split(":").map(Number);

    const startTotalMinutes = sh * 60 + sm + ss / 60;
    const endTotalMinutes = eh * 60 + em + es / 60;

    return endTotalMinutes - startTotalMinutes;
  }

  const duration = calculateDuration(task.startHour, task.endHour);

  const height = (duration / 60) * HOUR_HEIGHT - 8;

  const backgroundColor =
    task.priority === Priority.HIGH
      ? "oklch(70.4% 0.191 22.216)"
      : task.priority === Priority.MEDIUM
      ? "#ffd251"
      : "#ff9f69";

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          className="absolute left-4 right-4 rounded-xl p-3 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 group"
          style={{
            top: `${startOffset + 4}px`,
            height: `${height}px`,
            backgroundColor,
          }}
        >
          <div className="flex items-start justify-between h-full">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-[#323339] mb-2 truncate">
                {task.title}
              </h3>
            </div>

            <div className="flex flex-col items-end gap-2">
              {/* Time Badge */}
              <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-md">
                <Clock className="h-3 w-3 text-[#323339]" />
                <span className="text-xs font-medium text-[#323339]">
                  {duration}m
                </span>
              </div>

              {/* Expand Icon */}
              <div className="p-1 bg-white/80 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="h-3 w-3 text-[#323339]" />
              </div>
            </div>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-[#323339]">{task.title}</h4>

          {task.description && (
            <p className="text-xs text-muted-foreground">{task.description}</p>
          )}

          <div className="flex items-center gap-2 text-xs text-[#323339]">
            <Clock className="h-3 w-3" />
            <span>
              {task.startHour} – {task.endHour}
            </span>
          </div>

          <div className="flex justify-between text-xs">
            <span className="px-2 py-0.5 rounded bg-muted">{labels(task.status)}</span>

            <span className="px-2 py-0.5 rounded bg-muted">
            {labels(task.priority)}
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
