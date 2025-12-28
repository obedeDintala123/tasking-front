"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Lock, LogOut } from "lucide-react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export function SecuritySettings() {
  const router = useRouter();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const logout = () => {
    deleteCookie("token");
    router.refresh();
    router.push("/auth/login");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transition-shadow hover:shadow-md">
      <h2 className="text-xl font-semibold mb-6" style={{ color: "#323339" }}>
        Security
      </h2>

      <div className="space-y-6">
        {/* Change Password */}
        <div className="space-y-2">
          <Label style={{ color: "#323339" }}>Password</Label>
          <Button
            variant="outline"
            className="w-full gap-2 transition-all hover:border-[#8098f0] bg-transparent"
            style={{ borderColor: "#e5e5e5", color: "#323339" }}
          >
            <Lock className="h-4 w-4" />
            Change Password
          </Button>
        </div>

        {/* Two-Factor Authentication */}
        <div
          className="flex items-center justify-between py-4 border-t border-b"
          style={{ borderColor: "#f0f0f0" }}
        >
          <div className="flex-1">
            <Label
              htmlFor="2fa"
              className="cursor-pointer font-medium"
              style={{ color: "#323339" }}
            >
              Two-Factor Authentication
            </Label>
            <p
              className="text-xs mt-1"
              style={{ color: "#323339", opacity: 0.6 }}
            >
              Add an extra layer of security to your account
            </p>
          </div>
          <Switch
            id="2fa"
            checked={twoFactorEnabled}
            onCheckedChange={setTwoFactorEnabled}
            className="data-[state=checked]:bg-[#8098f0]"
          />
        </div>

        {/* Logout Button */}
        <Button
          onClick={logout}
          variant="outline"
          className="w-full gap-2 transition-all hover:bg-[#ff9f69] hover:text-white hover:border-[#ff9f69] bg-transparent"
          style={{ borderColor: "#ff9f69", color: "#ff9f69" }}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
