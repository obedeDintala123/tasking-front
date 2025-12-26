"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    taskReminders: true,
    dueDateAlerts: true,
    emailNotifications: false,
    pushNotifications: true,
  })

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const notificationItems = [
    { key: "taskReminders", label: "Task Reminders", description: "Get reminded about your upcoming tasks" },
    { key: "dueDateAlerts", label: "Due Date Alerts", description: "Receive alerts when tasks are due soon" },
    { key: "emailNotifications", label: "Email Notifications", description: "Receive notifications via email" },
    { key: "pushNotifications", label: "Push Notifications", description: "Get browser push notifications" },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transition-shadow hover:shadow-md">
      <h2 className="text-xl font-semibold mb-6" style={{ color: "#323339" }}>
        Notifications
      </h2>

      <div className="space-y-4">
        {notificationItems.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between py-3 border-b last:border-b-0"
            style={{ borderColor: "#f0f0f0" }}
          >
            <div className="flex-1">
              <Label htmlFor={item.key} className="cursor-pointer font-medium" style={{ color: "#323339" }}>
                {item.label}
              </Label>
              <p className="text-xs mt-1" style={{ color: "#323339", opacity: 0.6 }}>
                {item.description}
              </p>
            </div>
            <Switch
              id={item.key}
              checked={notifications[item.key as keyof typeof notifications]}
              onCheckedChange={() => toggleNotification(item.key as keyof typeof notifications)}
              className="data-[state=checked]:bg-[#8098f0]"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
