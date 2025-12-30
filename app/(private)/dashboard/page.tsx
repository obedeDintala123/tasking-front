"use client";

import {
  TaskAnalysis,
  TaskCard,
  TaskSchedule,
  TaskTimeLine,
  TaskTimeTracker,
  TaskToday,
} from "@/components/tasking-cards";
import { useAnalysisDashbaord } from "@/lib/requests";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const { data: metrics, isLoading } = useAnalysisDashbaord();

  const getTaskCardData = (taskCount: number) => [
    {
      title: "Productive",
      number: taskCount >= 10 ? taskCount : 0,
      color: "bg-tasking-primary-00",
    },
    {
      title: "Middle",
      number: taskCount >= 1 && taskCount <= 6 ? taskCount : 0,
      color: "bg-tasking-primary-10",
    },
    {
      title: "Idle",
      number: taskCount === 0 ? 100 : 0,
      color: "bg-tasking-primary-40",
    },
  ];

  const TaskCardData = metrics ? getTaskCardData(metrics.taskCount ?? 0) : [];

  return (
    <div className="grid gap-2 md:gap-4">
      <section className="grid md:grid-cols-[1fr_2fr] gap-4">
        <article className="grid gap-4">
          <div className="grid md:grid-cols-[1fr_1fr] gap-4">
            <TaskCard
              loading={isLoading}
              item={TaskCardData}
              title="Tasks"
              numbers={metrics?.taskCount ?? 0}
              description="tasks"
              footer="progress"
              icon={ArrowUpRight}
           
            />

            <TaskCard
              loading={isLoading}
              title="Core Teams"
              item={metrics?.teamMembersCount ?? 0}
              numbers={metrics?.teamMembersCount ?? 0}
              description="member"
              footer="avatar"
              icon={ArrowUpRight}
            />
          </div>

          <TaskAnalysis loading={isLoading} chartData={metrics?.tasksPerDay ?? []} />
        </article>
        <article className="grid">
          <TaskTimeLine loading={isLoading} />
        </article>
      </section>

      <section className="grid md:grid-cols-[1fr_2fr] gap-4">
        <article className="grid">
          <TaskSchedule loading={isLoading} />
        </article>
        <article className="grid md:grid-cols-2 gap-4">
          <TaskTimeTracker loading={isLoading} />
          <TaskToday tasks={metrics?.taskForToday ?? []} loading={isLoading} />
        </article>
      </section>
    </div>
  );
}
