import { Priority, Status } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function labels(label: Status | Priority) {
  switch (label) {
    case Status.TO_DO:
      return "To do";
    case Status.IN_PROGRESS:
      return "In progress";
    case Status.DONE:
      return "Done";
    case Priority.HIGH:
      return "High";
    case Priority.MEDIUM:
      return "Medium";
    case Priority.LOW:
      return "Low";
    default:
      return label;
  }
}


export const HOURS = Array.from({ length: 24 }, (_, i) =>
  String(i).padStart(2, "0")
);

export const MINUTES = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0")
);

export const SECONDS = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0")
);
