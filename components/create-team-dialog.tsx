"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, X } from "lucide-react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useMe } from "@/lib/requests";

interface CreateTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  addMember?: boolean;
}

const TeamSchema = z.object({
  teamName: z.string().min(1, { message: "Name is required" }),
  memberEmails: z
    .array(z.string().email())
    .min(1, { message: "At least one member is required" }),
  currentEmail: z.string().optional(),
});

const EmailSchema = z.string().email();

type TeamFormData = z.infer<typeof TeamSchema>;

export function CreateTeamDialog({
  open,
  onOpenChange,
  addMember = false,
}: CreateTeamDialogProps) {
  const { refetch } = useMe();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    watch,
    setError,
    clearErrors,
  } = useForm<TeamFormData>({
    resolver: zodResolver(TeamSchema),
    defaultValues: {
      teamName: "",
      memberEmails: [],
      currentEmail: "",
    },
    mode: "onChange",
  });

  const createTeam = useMutation({
    mutationFn: async (data: TeamFormData) => {
      await api.post("/team", {
        name: data.teamName,
        memberEmails: data.memberEmails,
      });
    },
    onSuccess: () => {
      refetch();
      toast.success("Team created successfully");
      reset();
      onOpenChange(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create team");
    },
  });

  const handleAddEmail = () => {
    const currentEmail = getValues("currentEmail");
    if (!currentEmail) return;

    const existingEmails = getValues("memberEmails") || [];

    if (existingEmails.includes(currentEmail)) {
      setError("currentEmail", {
        type: "manual",
        message: "Email already exists",
      });
      return;
    }

    const parsed = EmailSchema.safeParse(currentEmail);
    if (!parsed.success) {
      setError("currentEmail", {
        type: "manual",
        message: "Invalid email address",
      });
      return;
    }

    clearErrors("currentEmail");
    setValue("memberEmails", [...existingEmails, currentEmail]);
    setValue("currentEmail", "");
  };

  const handleRemoveEmail = (email: string) => {
    const existingEmails = getValues("memberEmails") || [];
    if (existingEmails.includes(email)) {
      const updatedEmails = existingEmails.filter((e) => e !== email);
      setValue("memberEmails", updatedEmails);
    }
  };

  const handleCancel = () => {
    reset();
    onOpenChange(false);
  };

  const onSubmit = (data: TeamFormData) => {
    createTeam.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md gap-6 rounded-2xl border-none bg-white p-6 shadow-lg sm:rounded-2xl sm:p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle
            className="text-xl font-semibold"
            style={{ color: "#323339" }}
          >
            {addMember ? "Add Members" : "Create Team"}
          </DialogTitle>
          <DialogDescription className="text-sm" style={{ color: "#666" }}>
            {addMember
              ? "Add new members to your team by entering their email addresses below."
              : " Create a new team and invite members to collaborate"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Team Name Input */}
          <div className="space-y-2">
            <Label
              htmlFor="teamName"
              className="text-sm font-medium"
              style={{ color: "#323339" }}
            >
              Team Name
              <span className="text-red-500" aria-label="required">
                {" "}
                *
              </span>
            </Label>
            <Input
              id="teamName"
              {...register("teamName")}
              placeholder="Enter team name"
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition-colors focus:border-transparent focus:bg-white focus:outline-none"
              aria-invalid={!!errors.teamName}
              aria-describedby={errors.teamName ? "teamName-error" : undefined}
            />
            {errors.teamName && (
              <p id="teamName-error" className="text-xs text-red-500">
                {errors.teamName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="currentEmail"
              className="text-sm font-medium"
              style={{ color: "#323339" }}
            >
              Add Members by Email
              <span className="text-red-500" aria-label="required">
                {" "}
                *
              </span>
            </Label>
            <div className="flex gap-2">
              <Input
                id="currentEmail"
                type="email"
                {...register("currentEmail")}
                placeholder="Enter email address"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddEmail();
                  }
                }}
                className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition-colors focus:border-transparent focus:bg-white focus:outline-none"
                aria-invalid={!!errors.currentEmail}
                aria-describedby={
                  errors.currentEmail ? "email-error" : undefined
                }
              />
              <Button
                type="button"
                onClick={handleAddEmail}
                className="rounded-lg px-4 font-medium text-white transition-all"
                style={{
                  backgroundColor: "#8098f0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#6b7fd4";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#8098f0";
                }}
              >
                Add
              </Button>
            </div>
            {errors.currentEmail && (
              <p id="email-error" className="text-xs text-red-500">
                {errors.currentEmail.message}
              </p>
            )}
          </div>

          {watch("memberEmails").length > 0 && (
            <div className="space-y-2">
              <Label
                className="text-sm font-medium"
                style={{ color: "#323339" }}
              >
                Team Members ({watch("memberEmails").length})
              </Label>
              <div className="flex flex-wrap gap-2 rounded-lg bg-gray-50 p-3">
                {watch("memberEmails").map((email) => (
                  <div
                    key={email}
                    className="flex items-center gap-2 rounded-full px-3 py-1"
                    style={{ backgroundColor: "#f0f1ff" }}
                  >
                    <Mail className="h-3 w-3" style={{ color: "#8098f0" }} />
                    <span
                      className="text-xs font-medium"
                      style={{ color: "#323339" }}
                    >
                      {email}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveEmail(email)}
                      className="hover:opacity-70"
                      aria-label={`Remove ${email}`}
                    >
                      <X className="h-3.5 w-3.5" style={{ color: "#8098f0" }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              disabled={!!errors.teamName || watch("memberEmails").length === 0}
              type="submit"
              className="flex-1 rounded-lg font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "#8098f0",
              }}
            >
              {!addMember && createTeam.isPending
                ? "Creating..."
                : "Create Team"}

             
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="rounded-lg font-medium bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
