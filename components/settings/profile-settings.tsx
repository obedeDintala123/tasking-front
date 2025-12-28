"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

export function ProfileSettings({ user }: { user: any }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transition-shadow hover:shadow-md">
      <h2 className="text-xl font-semibold mb-6" style={{ color: "#323339" }}>
        Profile Settings
      </h2>

      <div className="space-y-6">
        {/* Avatar Upload */}
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder.svg?height=80&width=80" />
            <AvatarFallback
              style={{ backgroundColor: "#8098f0", color: "white" }}
            >
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
            style={{ borderColor: "#8098f0", color: "#8098f0" }}
          >
            <Upload className="h-4 w-4" />
            Upload Photo
          </Button>
        </div>

        {/* Name Input */}
        <div className="space-y-2">
          <Label htmlFor="name" style={{ color: "#323339" }}>
            Name
          </Label>
          <Input
            id="name"
            disabled
            value={user?.firstName}
            className="transition-all focus:ring-2"
            style={{ borderColor: "#e5e5e5" }}
          />
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email" style={{ color: "#323339" }}>
            Email
          </Label>
          <Input
            disabled
            id="email"
            type="email"
            value={user?.email}
            className="transition-all focus:ring-2"
            style={{ borderColor: "#e5e5e5" }}
          />
        </div>

        {/* Save Button */}
        <div className="grid grid-cols-[2fr_1fr] gap-2 ">
          <Button
            className="w-full transition-all hover:opacity-90 cursor-pointer"
            style={{ backgroundColor: "#8098f0", color: "white" }}
          >
            Edit Profile
          </Button>

          <Button
            disabled
            className="w-full cursor-pointer transition-all hover:opacity-90 bg-transparent border border-tasking-primary-00 text-tasking-primary-00"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
