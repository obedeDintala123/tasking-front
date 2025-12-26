"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

export function ProfileSettings() {
  const [name, setName] = useState("Sarah Johnson")
  const [email, setEmail] = useState("sarah.johnson@example.com")

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
            <AvatarFallback style={{ backgroundColor: "#8098f0", color: "white" }}>SJ</AvatarFallback>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="transition-all focus:ring-2"
            style={{ borderColor: "#e5e5e5" }}
          />
        </div>

        {/* Save Button */}
        <Button
          className="w-full transition-all hover:opacity-90"
          style={{ backgroundColor: "#8098f0", color: "white" }}
        >
          Save Changes
        </Button>
      </div>
    </div>
  )
}
