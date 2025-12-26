import type { Metadata } from "next"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { AppearanceSettings } from "@/components/settings/appearance-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { SecuritySettings } from "@/components/settings/security-settings"
import { PreferenceSettings } from "@/components/settings/preference-settings"

export const metadata: Metadata = {
  title: "Settings | Task Manager",
  description: "Manage your account, preferences, and application behavior",
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f8f8" }}>
      <div className="max-w-7xl mx-auto ">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#323339" }}>
            Settings
          </h1>
          <p className="text-sm" style={{ color: "#323339", opacity: 0.6 }}>
            Manage your account, preferences, and application behavior
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProfileSettings />
          <AppearanceSettings />
          <NotificationSettings />
          <SecuritySettings />
          <PreferenceSettings />
        </div>
      </div>
    </div>
  )
}
