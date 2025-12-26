"use client";

import { Status } from "@/types/types";

interface TaskMiniCardProps {
  title: string;
  status: Status;
}

const statusColor = {
  TO_DO: "bg-[var(--color-tasking-primary-00)]",
  IN_PROGRESS: "bg-[var(--color-tasking-primary-10)]",
  DONE: "bg-[var(--color-tasking-primary-20)]",
};

export function TaskMiniCard({ title, status }: TaskMiniCardProps) {
  return (
    <div
      className={`
        w-full
        rounded-md
        px-2 py-1
        text-xs
        font-medium
        text-[#323339]
        ${statusColor[status]}
      `}
    >
      <span className="block truncate">{title}</span>
    </div>
  );
}
