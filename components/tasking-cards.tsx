"use client";

import { priorityColors, TaskCardProps } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  ArrowUpRight,
  CalendarIcon,
  Copy,
  MoreVertical,
  Pause,
  Play,
  Plus,
  Square,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";
import { useTasks } from "@/lib/requests";

export const TaskCard = ({
  loading,
  item: data,
  title,
  description,
  footer = "progress",
  icon: Icon,
  numbers,
}: TaskCardProps & {loading?: boolean}) => {
  return (
    <Card loading={loading} className="py-4">
      <div className="flex items-center justify-between px-4">
        <CardTitle>{title}</CardTitle>
        {Icon && (
          <div className="p-2 rounded-full flex items-center justify-center bg-gray-100">
            <Icon className="size-4" />
          </div> 
        )}
      </div>

      <CardContent className="flex items-end gap-2 pt-3">
        <span className="text-2xl">{numbers}</span>
        <span className="text-sm text-gray-500">{description}</span>
      </CardContent>

      {footer === "progress" ? (
        <CardFooter className="flex items-center justify-between pt-3">
          <div className="w-full">
            <div className="flex w-full h-2 gap-2">
              {data?.map((item, i) => (
                <div
                  key={i}
                  className={`${item.color} h-full rounded-full`}
                  style={{ width: `${item.number}%` }}
                ></div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              {data?.map((item, i) => (
                <span key={i}>{item.title}</span>
              ))}
            </div>
          </div>
        </CardFooter>
      ) : (
        <CardFooter className="flex items-center gap-2 pt-3">
          {data?.length > 0 ? (
            data?.map((member, i) => (
              <Avatar key={i} className="w-8 h-8 -ml-2">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{member.name}</AvatarFallback>
              </Avatar>
            ))
          ) : (
            <Button className="text-sm flex items-center justify-center rounded-full p-2 bg-gray-100 w-full text-tasking-primary-40">
              <Plus className="size-4 mr-2" /> Add Member
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export const TaskAnalysis = ({loading = false}) => {
  const chartData = [
    { day: "monday", tasks: 10, fill: "var(--color-tasking-primary-00)" },
    { day: "tuesday", tasks: 200, fill: "var(--color-tasking-primary-10)" },
    { day: "wednesday", tasks: 275, fill: "var(--color-tasking-primary-20)" },
    { day: "thursday", tasks: 173, fill: "var(--color-tasking-primary-30)" },
    { day: "friday", tasks: 90, fill: "var(--color-tasking-primary-40)" },
  ];

  const chartConfig = {
    tasks: {
      label: "Tasks",
    },
    monday: {
      label: "Monday",
      color: "var(--chart-1)",
    },
    tuesday: {
      label: "Tuesday",
      color: "var(--chart-2)",
    },
    wednesday: {
      label: "Wednesday",
      color: "var(--chart-3)",
    },
    thursday: {
      label: "Thursday",
      color: "var(--chart-4)",
    },
    friday: {
      label: "Friday",
      color: "var(--chart-5)",
    },
  } satisfies ChartConfig;

  return (
    <Card loading={loading}>
      <CardHeader>
        <CardTitle>Task Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-32">
          {" "}
          <ChartContainer className="h-36 w-full" config={chartConfig}>
            <BarChart
              data={chartData}
              width={200}
              height={200}
              accessibilityLayer
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) =>
                  chartConfig[value as keyof typeof chartConfig]?.label
                }
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="tasks" radius={12} activeIndex={2} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export const TaskTimeLine = ({loading = false}) => {
  const { data: tasks } = useTasks();

  return (
    <Card loading={loading} className="overflow-hidden">
      <div className="flex items-center justify-between px-4">
        <div className="space-y-1">
          <CardTitle>Timeline</CardTitle>
          <CardDescription>See the progress here!</CardDescription>
        </div>

        <div className="flex items-center">
          {/* <div className="flex mr-3">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Avatar key={i} className="w-8 h-8 -ml-2 border-2 border-white">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              ))}
          </div> */}

          <div className="bg-gray-200 rounded-full px-3 py-1 flex items-center gap-2">
            <Button
              size="icon"
              className="rounded-full bg-tasking-primary-00 w-6 h-6 text-white"
            >
              <Plus size={14} />
            </Button>
            <span className="text-sm">Add</span>
          </div>
        </div>
      </div>
      <CardContent className="overflow-hidden">
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="relative min-w-max ">
            <div className="flex h-68">
              {Array.from({ length: 24 }, (_, hour) => (
                <div
                  key={hour}
                  className="w-20 shrink-0 border-r text-[10px] text-center py-2 text-gray-500"
                >
                  <span className="text">
                    {hour.toString().padStart(2, "0")}:00
                  </span>
                </div>
              ))}
            </div>

            {tasks?.map((task, i) => {
              const hourWidth = 80;
              const left = parseInt(task.startHour) * hourWidth;
              const width =
                (parseInt(task.endHour) - parseInt(task.startHour)) * hourWidth;

              const priorityKey = task.priority ?? "low";
              const priorityClass =
                priorityColors[priorityKey as keyof typeof priorityColors];

              return (
                <div
                  key={i}
                  className={`absolute h-12 text-white text-xs rounded-full flex items-center justify-between px-2 ${priorityClass}`}
                  style={{
                    left,
                    width,
                    top: `${40 + i * 60}px`,
                  }}
                >
                  <Avatar key={i} className="w-8 h-8 ">
                    <AvatarImage src="https://github.com/shadcnpng" />
                    <AvatarFallback className="bg-white/20">CN</AvatarFallback>
                  </Avatar>

                  {task.title}

                  <div className="rounded-full bg-white/20 p-2">
                    <ArrowUpRight className="text-white size-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const TaskSchedule = ({loading = false}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const shedules = [
    {
      person: "Yours",
      tasks: [],
    },

    {
      person: "Joana",
      tasks: [],
    },
  ];

  return (
    <Card loading={loading} className="h-full">
      <div className="flex items-center justify-between px-6">
        <CardTitle>Schedules</CardTitle>
        <div className="place-items-center place-content-center rounded-full bg-gray-50 border w-10 h-10">
          <CalendarIcon className="size-4" />
        </div>
      </div>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="w-full"
          captionLayout="label"
        />
      </CardContent>

      <CardFooter className="flex items-center gap-2">
        {shedules.map((shedule, i) => {
          return (
            <div
              className="rounded-full px-2 py-1 flex items-center gap-2 bg-gray-200"
              key={i}
            >
              <Avatar key={i} className="w-8 h-8 ">
                <AvatarImage src="https://github.com/shadcnpng" />
                <AvatarFallback className="bg-gray-300">CN</AvatarFallback>
              </Avatar>

              <span className="text-sm">{shedule.person}</span>
            </div>
          );
        })}
      </CardFooter>
    </Card>
  );
};

export const TaskTimeTracker = ({loading = false}) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const handlePauseResume = () => {
    setIsRunning(!isRunning);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <Card loading={loading} className="bg-[#2a2d35] border-none text-white relative">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-normal text-gray-300">
            Time tracker
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white bg-white/10 rounded-full"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="mt-20 flex flex-col items-center justify-center">
        <div className="text-5xl font-light tracking-wider tabular-nums">
          {formatTime(time)}
        </div>
      </CardContent>

      <CardFooter className="mt-20 w-full flex items-center justify-center">
        <div className="flex items-center gap-4">
          <Button
            onClick={handlePauseResume}
            size="icon"
            className="h-14 w-14 rounded-full bg-white text-gray-900 hover:bg-gray-100"
          >
            {isRunning ? (
              <Pause className="h-6 w-6" fill="currentColor" />
            ) : (
              <Play className="h-6 w-6" fill="currentColor" />
            )}
          </Button>
          <Button
            onClick={handleStop}
            size="icon"
            className="h-14 w-14 rounded-full bg-[#e57373] hover:bg-[#ef5350] text-white"
          >
            <Square className="h-5 w-5" fill="currentColor" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export const TaskToday = ({loading = false}) => {
  const tasks = [
    {
      id: 1,
      title: "Create design system",
      description: "Adjust text and color at Landing page",
      progress: 81,
    },
    {
      id: 2,
      title: "Feedback at Mobile apps",
      description: "Adjust text and color at Landing page",
      progress: 81,
    },
  ];

  return (
    <Card loading={loading} className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-semibold text-foreground">
          Task for today
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 bg-gray-100 rounded-full"
        >
          <ArrowUpRight className="h-4 w-4" />
        </Button>{" "}
      </CardHeader>
      <CardContent className="space-y-6 pb-6">
        {/* First Task */}
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {tasks[0].title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {tasks[0].description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Progress value={tasks[0].progress} className="flex-1 h-2" />
            <span className="text-sm font-medium text-muted-foreground min-w-[3ch]">
              {tasks[0].progress}%
            </span>
          </div>
        </div>

        {/* Meeting Badge */}
        {/* <div className="relative bg-indigo-500 rounded-full py-4 px-6 flex items-center gap-4">
          <div className="bg-slate-900 rounded-full w-12 h-12 flex flex-col items-center justify-center text-white flex-shrink-0">
            <span className="text-xl font-bold leading-none">8</span>
            <span className="text-xs leading-none">Tue</span>
          </div>
          <span className="text-white text-lg font-medium flex-1">
            Meeting with Reza
          </span>
          <div className="flex items-center gap-2">
            <button className="bg-indigo-400/50 hover:bg-indigo-400/70 rounded-full p-2 text-white transition-colors">
              <MoreVertical className="h-5 w-5" />
            </button>
            <button className="bg-indigo-400/50 hover:bg-indigo-400/70 rounded-full p-2 text-white transition-colors">
              <Copy className="h-5 w-5" />
            </button>
          </div>
        </div> */}

        {/* Second Task */}
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {tasks[1].title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {tasks[1].description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Progress value={tasks[1].progress} className="flex-1 h-2" />
            <span className="text-sm font-medium text-muted-foreground min-w-[3ch]">
              {tasks[1].progress}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
