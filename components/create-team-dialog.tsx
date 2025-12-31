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
import { useMe, useTeam } from "@/lib/requests";
import { useEffect } from "react";

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

const AddMemberSchema = z.object({
  memberEmails: z
    .array(z.string().email())
    .min(1, { message: "At least one member is required" }),
  currentEmail: z.string().optional(),
});

const EmailSchema = z.string().email();

type TeamFormData = z.infer<typeof TeamSchema>;
type AddMemberFormData = z.infer<typeof AddMemberSchema>;

export function CreateTeamDialog({
  open,
  onOpenChange,
  addMember = false,
}: CreateTeamDialogProps) {
  const { refetch } = useMe();

  const {
    register: registerTeam,
    handleSubmit: handleSubmitTeam,
    formState: { errors: teamErrors },
    reset: resetTeam,
    setValue: setTeamValue,
    getValues: getTeamValues,
    watch: watchTeam,
    setError: setTeamError,
    clearErrors: clearTeamErrors,
  } = useForm<TeamFormData>({
    resolver: zodResolver(TeamSchema),
    defaultValues: {
      teamName: "",
      memberEmails: [],
      currentEmail: "",
    },
    mode: "onChange",
  });

  const {
    register: registerMember,
    handleSubmit: handleSubmitMember,
    formState: { errors: memberErrors },
    reset: resetMember,
    setValue: setMemberValue,
    getValues: getMemberValues,
    watch: watchMember,
    setError: setMemberError,
    clearErrors: clearMemberErrors,
  } = useForm<AddMemberFormData>({
    resolver: zodResolver(AddMemberSchema),
    defaultValues: {
      memberEmails: [],
      currentEmail: "",
    },
    mode: "onChange",
  });

  const { data: team } = useTeam();

  // Choose form helpers according to dialog mode
  const handleSubmitFn = addMember ? handleSubmitMember : handleSubmitTeam;
  const errors = addMember ? memberErrors : teamErrors;
  const resetFn = addMember ? resetMember : resetTeam;

  const teamMemberEmails = watchTeam("memberEmails");
  const memberEmailsOnly = watchMember("memberEmails");

  const memberEmails = addMember
    ? memberEmailsOnly ?? []
    : teamMemberEmails ?? [];

  useEffect(() => {
    if (addMember) {
      resetMember({ memberEmails: [], currentEmail: "" });
    } else {
      resetTeam({ teamName: "", memberEmails: [], currentEmail: "" });
    }
  }, [team, addMember, resetMember, resetTeam]);

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
      resetFn();
      onOpenChange(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create team");
    },
  });

  const addMemberMutation = useMutation({
    mutationFn: async (data: AddMemberFormData) => {
      const response = await api.patch(`/team/${team?.id}/member`, {
        memberEmails: data.memberEmails,
      });

      return response.data;
    },
    onSuccess: (data) => {
      if (data.notFound && data.notFound.length > 0) {
        toast.warning(
          `These emails were not found and an invitation was sent: ${data.notFound.join(
            ", "
          )}`
        );
      } else {
        toast.success("Member added successfully");
      }

      refetch();
      resetFn();
      onOpenChange(false);
    },

    onError: (error) => {
      console.error(error);
      toast.error("Failed to add member");
    },
  });

  const handleAddEmail = () => {
    if (addMember) {
      const currentEmail = getMemberValues("currentEmail");
      if (!currentEmail) return;

      const existingEmails = getMemberValues("memberEmails") ?? [];

      if (existingEmails.includes(currentEmail)) {
        setMemberError("currentEmail", {
          type: "manual",
          message: "Email already exists",
        });
        return;
      }

      const parsed = EmailSchema.safeParse(currentEmail);
      if (!parsed.success) {
        setMemberError("currentEmail", {
          type: "manual",
          message: "Invalid email address",
        });
        return;
      }

      clearMemberErrors("currentEmail");
      setMemberValue("memberEmails", [...existingEmails, currentEmail]);
      setMemberValue("currentEmail", "");
      return;
    }

    // CREATE TEAM MODE
    const currentEmail = getTeamValues("currentEmail");
    if (!currentEmail) return;

    const existingEmails = getTeamValues("memberEmails") ?? [];

    if (existingEmails.includes(currentEmail)) {
      setTeamError("currentEmail", {
        type: "manual",
        message: "Email already exists",
      });
      return;
    }

    const parsed = EmailSchema.safeParse(currentEmail);
    if (!parsed.success) {
      setTeamError("currentEmail", {
        type: "manual",
        message: "Invalid email address",
      });
      return;
    }

    clearTeamErrors("currentEmail");
    setTeamValue("memberEmails", [...existingEmails, currentEmail]);
    setTeamValue("currentEmail", "");
  };

  const handleRemoveEmail = (email: string) => {
    if (addMember) {
      const emails = getMemberValues("memberEmails") ?? [];
      setMemberValue(
        "memberEmails",
        emails.filter((e) => e !== email)
      );
      return;
    }

    const emails = getTeamValues("memberEmails") ?? [];
    setTeamValue(
      "memberEmails",
      emails.filter((e) => e !== email)
    );
  };

  const handleCancel = () => {
    resetFn();
    onOpenChange(false);
  };

  const onSubmit = (data: TeamFormData | AddMemberFormData) => {
    if (addMember) {
      addMemberMutation.mutate(data as AddMemberFormData);
    } else {
      createTeam.mutate(data as TeamFormData);
    }
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

        <form
          onSubmit={handleSubmitFn(onSubmit, (errors) => {
            console.error(errors);
          })}
          className="space-y-5"
        >
          {/* Team Name Input */}
          {!addMember && (
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
                {...registerTeam("teamName")}
                placeholder="Enter team name"
                className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition-colors focus:border-transparent focus:bg-white focus:outline-none"
                aria-invalid={!!teamErrors.teamName}
                aria-describedby={
                  teamErrors.teamName ? "teamName-error" : undefined
                }
              />
              {teamErrors.teamName && (
                <p id="teamName-error" className="text-xs text-red-500">
                  {teamErrors.teamName.message}
                </p>
              )}
            </div>
          )}

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
                {...(addMember
                  ? registerMember("currentEmail")
                  : registerTeam("currentEmail"))}
                placeholder="Enter email address"
                onKeyDown={(e) => {
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

          {memberEmails.length > 0 && (
            <div className="space-y-2">
              <Label
                className="text-sm font-medium"
                style={{ color: "#323339" }}
              >
                Team Members ({memberEmails.length})
              </Label>
              <div className="flex flex-wrap gap-2 rounded-lg bg-gray-50 p-3">
                {memberEmails.map((email) => (
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
              disabled={
                addMember
                  ? memberEmails.length === 0 || addMemberMutation.isPending
                  : !!teamErrors.teamName || createTeam.isPending
              }
              type="submit"
              className="flex-1 rounded-lg font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "#8098f0",
              }}
            >
              {addMember
                ? addMemberMutation.isPending
                  ? "Adding..."
                  : "Add Members"
                : createTeam.isPending
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
