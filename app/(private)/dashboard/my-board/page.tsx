"use client";

import type React from "react";

import { useState } from "react";
import {
  Search,
  Calendar,
  MoreVertical,
  Plus,
  Filter,
  Clipboard,
  LucideIcon,
  CheckCircleIcon,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { CreateTaskDialog } from "@/components/create-task-dialog";
import { Priority, Status, Task } from "@/types/types";
import { useTasks } from "@/lib/requests";
import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { labels } from "@/lib/utils";

export default function MyBoardPage() {
  const { data: tasks = [], refetch } = useTasks();
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

  const getTasksByStatus = (status: Status) => {
    return tasks?.filter((task) => task.status === status);
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleEdit = (taskId: string) => {
    setSelectedTask(tasks.find((task) => task.id === taskId) ?? undefined);
    setOpen(true);
  };

  const handleDrop = async (status: Status) => {
    if (!draggedTask) return;

    await api.patch(`/task/${draggedTask.id}/status`, {
      status,
    });
    refetch();
    setDraggedTask(null);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f8f8" }}>
      <div className="mx-auto max-w-7xl ">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-6">
            <h1
              className="mb-2 text-3xl font-bold text-pretty"
              style={{ color: "#323339" }}
            >
              My Board
            </h1>
            <p className="text-sm" style={{ color: "#6b6b75" }}>
              Organize and track your tasks efficiently
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1 lg:max-w-md">
              <Search
                className="absolute left-3 top-1/2 size-4 -translate-y-1/2"
                style={{ color: "#6b6b75" }}
              />
              <Input placeholder="Search tasks..." className="bg-white pl-10" />
            </div>

            {/* Filters and Add Button */}
            <div className="flex flex-wrap items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-white"
                  >
                    <Filter className="size-4" />
                    Priority
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>All</DropdownMenuItem>
                  <DropdownMenuItem>Low</DropdownMenuItem>
                  <DropdownMenuItem>Creative</DropdownMenuItem>
                  <DropdownMenuItem>Urgent</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-white"
                  >
                    <Filter className="size-4" />
                    Category
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>All</DropdownMenuItem>
                  <DropdownMenuItem>Design</DropdownMenuItem>
                  <DropdownMenuItem>Development</DropdownMenuItem>
                  <DropdownMenuItem>Marketing</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-white"
                  >
                    <Calendar className="size-4" />
                    Due Date
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>All</DropdownMenuItem>
                  <DropdownMenuItem>Today</DropdownMenuItem>
                  <DropdownMenuItem>This Week</DropdownMenuItem>
                  <DropdownMenuItem>This Month</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                size="sm"
                className="gap-2 text-white"
                style={{ backgroundColor: "#8098f0" }}
                onClick={() => setOpen(true)}
              >
                <Plus className="size-4" />
                Add Task
              </Button>
            </div>
          </div>
        </div>

        {tasks.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* To Do Column */}
            <KanbanColumn
              title="To Do"
              icon={Clipboard}
              count={getTasksByStatus(Status.TO_DO).length}
              tasks={getTasksByStatus(Status.TO_DO)}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(Status.TO_DO)}
              onEdit={handleEdit}
            />

            {/* In Progress Column */}
            <KanbanColumn
              title="In Progress"
              icon={Clock}
              count={getTasksByStatus(Status.IN_PROGRESS).length}
              tasks={getTasksByStatus(Status.IN_PROGRESS)}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(Status.IN_PROGRESS)}
              onEdit={handleEdit}
            />

            {/* Done Column */}
            <KanbanColumn
              title="Done"
              icon={CheckCircleIcon}
              count={getTasksByStatus(Status.DONE).length}
              tasks={getTasksByStatus(Status.DONE)}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(Status.DONE)}
              onEdit={handleEdit}
            />
          </div>
        ) : (
          <Card>
            <CardContent className="min-h-[30vh] flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="flex flex-col items-center space-y-2">
                  <div className=" text-tasking-primary-40 rounded-full">
                    <Clipboard />
                  </div>
                  <span>No tasks available</span>
                </div>

                <p className="text-sm text-gray-500">
                  Add your first task to get started.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <CreateTaskDialog
        open={open}
        setOpen={setOpen}
        task={selectedTask}
        isEditing={!!selectedTask}
      />
    </div>
  );
}

function KanbanColumn({
  icon: Icon,
  title,
  count,
  tasks,
  onDragStart,
  onDragOver,
  onDrop,
  onEdit,
}: {
  title: string;
  icon?: LucideIcon;
  count: number;
  tasks: Task[];
  onDragStart: (task: Task) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
  onEdit?: (taskId: string) => void;
}) {
  return (
    <Card
      className="flex flex-col rounded-xl bg-white p-4 shadow-sm"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {/* Column Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="size-6" />}
          <h2 className="text-lg font-semibold" style={{ color: "#323339" }}>
            {title}
          </h2>
        </div>
        <span
          className="flex size-6 items-center justify-center rounded-full text-xs font-medium text-white"
          style={{ backgroundColor: "#8098f0" }}
        >
          {count}
        </span>
      </div>

      {/* Task Cards */}
      <div className="space-y-3 overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDragStart={onDragStart}
            onEdit={onEdit}
          />
        ))}
      </div>
    </Card>
  );
}

function TaskCard({
  task,
  onDragStart,
  onEdit,
}: {
  task: Task;
  onDragStart: (task: Task) => void;
  onEdit?: (taskId: string) => void;
}) {
  const { refetch } = useTasks();

  const deleteTask = useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: async (taskId: string) => {
      await api.delete(`/task/${taskId}`);
    },

    onSuccess: () => {
      refetch();
      toast.success("Task deleted successfully");
    },

    onError: (error) => {
      toast.error("Failed to delete task");
      console.error(error);
    },
  });

  const handleMarkAsDone = async (taskId: string) => {
    await api.patch(`/task/${taskId}/status`, {
      status: Status.DONE,
    });

    refetch();
    toast.success("Task marked as done");
  };

  return (
    <div
      draggable
      onDragStart={() => onDragStart(task)}
      className="group relative cursor-move rounded-lg bg-white border"
    >
      {/* Colored Accent */}
      <div
        className="absolute left-0 top-0 h-full w-1"
      />

      <div className="p-4 pl-5">
        {/* Header with Title and Menu */}
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <h3
              className="flex-1 font-semibold leading-tight text-balance"
              style={{ color: "#323339" }}
            >
              {task.title}
            </h3>
            <Badge
              className={`${
                task.priority === Priority.HIGH
                  ? "bg-red-400"
                  : task.priority === Priority.MEDIUM
                  ? "bg-tasking-primary-10"
                  : "bg-tasking-primary-30"
              }`}
            >
              {labels(task.priority!)}
            </Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
     
                style={{ color: "#6b6b75" }}
              >
                <MoreVertical className="size-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(task.id)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMarkAsDone(task.id)}>
                Mark as done
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteTask.mutate(task.id)}
                className="text-red-600"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Description */}
        <p className="mb-3 line-clamp-1 text-sm" style={{ color: "#6b6b75" }}>
          {task.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-1.5 text-xs"
            style={{ color: "#6b6b75" }}
          >
            <Clock className="size-3.5" />
            <span>
              {task.startHour} - {""}
              {task.endHour}
            </span>
          </div>

          <div
            className="flex items-center gap-1.5 text-xs"
            style={{ color: "#6b6b75" }}
          >
            <Calendar className="size-3.5" />
            <span>
              {new Date(task.startDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
              - {""}
              {new Date(task.endDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
