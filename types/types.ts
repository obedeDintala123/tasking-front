import { LucideIcon } from "lucide-react";
import z from "zod";

export const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

// --- Tasking Cards Types -----

export interface TaskCardProps {
  title: string;
  numbers?: number;
  description?: string;
  icon?: LucideIcon;
  item: any[];
  footer: "progress" | "avatar";
}

export interface ProjectCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  progress: number;
  variant?: "purple" | "blue" | "green";
}

export const variantClasses = {
  purple: "border-l-purple-500",
  blue: "border-l-blue-500",
  green: "border-l-green-500",
};

export const variantProgressClasses = {
  purple: "bg-purple-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
};

export interface TaskItemProps {
  title: string;
  project: string;
  date?: string;
  time?: string;
  priority?: "HIGH" | "MEDIUM" | "LOW" | "DESIGN";
  avatarUrl?: string;
  avatarFallback?: string;
  completed?: boolean;
  onToggle?: (checked: boolean) => void;
}

export const priorityColors = {
  HIGH: "bg-tasking-primary-00",
  MEDIUM: "bg-tasking-primary-10",
  LOW: "bg-tasking-primary-30",
};

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  startDate: string;
  endDate: string;
  startHour: string;
  endHour: string;
  priority?: Priority;
  createdAt: string;
  updatedAt: string;
}

export interface TaskSectionProps {
  title: string;
  count: number;
  tasks: Task[];
}

export enum Status {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export enum Priority {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}
