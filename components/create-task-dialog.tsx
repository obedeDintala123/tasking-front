"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Priority, Status, Task } from "@/types/types";
import z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { labels } from "@/lib/utils";
import { useTasks } from "@/lib/requests";
import { useEffect } from "react";
import { TimePicker } from "./time-picker";

const TaskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  status: z.enum([Status.TO_DO, Status.IN_PROGRESS, Status.DONE]),
  priority: z.enum([Priority.LOW, Priority.MEDIUM, Priority.HIGH]),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  startHour: z.string().optional(),
  endHour: z.string().optional(),
});

type TaskFormData = z.infer<typeof TaskSchema>;

export function CreateTaskDialog({
  open,
  setOpen,
  isEditing = false,
  task,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  isEditing?: boolean;
  task?: Task;
}) {
  const { refetch } = useTasks();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: Status.TO_DO,
      priority: Priority.LOW,
      startDate: new Date(),
      endDate: new Date(),
      startHour: "",
      endHour: "",
    },
  });

  const createTask = useMutation<void, unknown, TaskFormData>({
    mutationKey: ["createTask"],
    mutationFn: async (data: TaskFormData) => {
      await api.post("/task", data);
    },

    onSuccess: () => {
      refetch();
      toast.success("Task created successfully");
      reset();
      setOpen(false);
    },

    onError: (error) => {
      toast.error("Failed to create task");
      console.error(error);
    },
  });

  const updateTask = useMutation<void, unknown, TaskFormData>({
    mutationKey: ["updateTask"],
    mutationFn: async (data: TaskFormData) => {
      await api.patch(`/task/${task?.id}`, data);
    },

    onSuccess: () => {
      refetch();
      toast.success("Task updated successfully");
      reset();
      setOpen(false);
    },

    onError: (error) => {
      toast.error("Failed to update task");
      console.error(error);
    },
  });

  useEffect(() => {
    const startDateValue =
      isEditing && task && task.startDate
        ? new Date(task.startDate)
        : new Date();
    const endDateValue =
      isEditing && task && task.endDate ? new Date(task.endDate) : new Date();

    reset({
      title: isEditing ? task?.title : "",
      description: isEditing ? task?.description : "",
      status: isEditing ? task?.status : Status.TO_DO,
      priority: isEditing ? task?.priority : Priority.LOW,
      startDate: startDateValue,
      endDate: endDateValue,
      startHour: isEditing ? task?.startHour : "",
      endHour: isEditing ? task?.endHour : "",
    });
  }, [isEditing, task, reset]);

  const handleSave = (data: TaskFormData) => {
    if (isEditing) {
      updateTask.mutate(data);
    } else {
      createTask.mutate(data);
    }
  };

  const handleCancel = () => {
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[550px] bg-[#f8f8f8] border-[#323339]/20">
        <DialogHeader>
          <DialogTitle className="text-[#323339] text-xl">
            Create New Task
          </DialogTitle>
          <DialogDescription className="text-[#323339]/70">
            Fill in the details for your new task. Title is required.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-5 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title" className="text-[#323339] font-medium">
              Title
            </Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Enter task title"
              className="bg-white border-[#323339]/20 text-[#323339] placeholder:text-[#323339]/40 focus-visible:ring-[#8098f0]"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description" className="text-[#323339] font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Enter task description (optional)"
              rows={3}
              className="bg-white border-[#323339]/20 text-[#323339] placeholder:text-[#323339]/40 resize-none focus-visible:ring-[#8098f0]"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="status" className="text-[#323339] font-medium">
                Status
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="status"
                      className="bg-white border-tasking-primary-40/20 text-tasking-primary-40 focus:ring-tasking-primary-00 w-full"
                    >
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-tasking-primary-40/20">
                      {Object.values(Status).map((status) => (
                        <SelectItem
                          key={status}
                          value={status}
                          className=" text-tasking-primary-40"
                        >
                          {labels(status)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="priority"
                className="text-tasking-primary-40 font-medium"
              >
                Priority
              </Label>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="priority"
                      className="bg-white border-tasking-primary-40/20 text-tasking-primary-40 focus:ring-tasking-primary-00 w-full"
                    >
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-tasking-primary-40/20">
                      {Object.values(Priority).map((priority) => (
                        <SelectItem
                          key={priority}
                          value={priority}
                          className=" text-tasking-primary-40"
                        >
                          {labels(priority)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Start Date */}
            <div className="grid gap-2">
              <Label htmlFor="startDate" className="text-[#323339] font-medium">
                Start Date
              </Label>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left bg-white border-[#323339]/20 text-[#323339]"
                      >
                        {field.value
                          ? format(field.value, "dd/MM/yyyy")
                          : "Select date"}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>

            {/* End Date */}
            <div className="grid gap-2">
              <Label htmlFor="endDate" className="text-[#323339] font-medium">
                End Date
              </Label>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left bg-white border-[#323339]/20 text-[#323339]"
                      >
                        {field.value
                          ? format(field.value, "dd/MM/yyyy")
                          : "Select date"}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Start Hour */}
            <div className="grid gap-2">
              <Label htmlFor="startHour" className="text-[#323339] font-medium">
                Start Time
              </Label>
              <Controller
                name="startHour"
                control={control}
                render={({ field }) => (
                  <TimePicker value={field.value} onChange={field.onChange} />
                )}
              />
            </div>

            {/* End Hour */}
            <div className="grid gap-2">
              <Label htmlFor="startHour" className="text-[#323339] font-medium">
                End Time
              </Label>
              <Controller
                name="endHour"
                control={control}
                render={({ field }) => (
                  <TimePicker value={field.value} onChange={field.onChange} />
                )}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            onClick={handleCancel}
            className="bg-transparent border border-tasking-primary-40 text-tasking-primary-40"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit(handleSave)}
            disabled={createTask.isPending || updateTask.isPending}
            className="bg-tasking-primary-00 text-white hover:bg-[#6b82d4] font-medium"
          >
            {createTask.isPending || updateTask.isPending ? "Saving" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
