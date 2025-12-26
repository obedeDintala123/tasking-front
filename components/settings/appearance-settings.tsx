"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function AppearanceSettings() {
  const [theme, setTheme] = useState("light")
  const [accentColor, setAccentColor] = useState("#8098f0")
  const [uiScale, setUiScale] = useState("default")

  const accentColors = [
    { name: "Primary", value: "#8098f0" },
    { name: "Warning", value: "#ff9f69" },
    { name: "Accent", value: "#f090f1" },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transition-shadow hover:shadow-md">
      <h2 className="text-xl font-semibold mb-6" style={{ color: "#323339" }}>
        Appearance
      </h2>

      <div className="space-y-6">
        {/* Theme Toggle */}
        <div className="space-y-3">
          <Label style={{ color: "#323339" }}>Theme</Label>
          <RadioGroup value={theme} onValueChange={setTheme}>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light" className="font-normal cursor-pointer" style={{ color: "#323339" }}>
                  Light
                </Label>
              </div>
              <div className="flex items-center space-x-2 opacity-50">
                <RadioGroupItem value="dark" id="dark" disabled />
                <Label htmlFor="dark" className="font-normal cursor-not-allowed" style={{ color: "#323339" }}>
                  Dark
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Accent Color */}
        <div className="space-y-3">
          <Label style={{ color: "#323339" }}>Accent Color</Label>
          <div className="flex gap-3">
            {accentColors.map((color) => (
              <button
                key={color.value}
                onClick={() => setAccentColor(color.value)}
                className="relative w-12 h-12 rounded-lg transition-all hover:scale-110"
                style={{
                  backgroundColor: color.value,
                  outline: accentColor === color.value ? "3px solid #323339" : "none",
                  outlineOffset: "2px",
                }}
                title={color.name}
              >
                {accentColor === color.value && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* UI Scale */}
        <div className="space-y-3">
          <Label style={{ color: "#323339" }}>UI Scale</Label>
          <RadioGroup value={uiScale} onValueChange={setUiScale}>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="small" />
                <Label htmlFor="small" className="font-normal cursor-pointer" style={{ color: "#323339" }}>
                  Small
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="default" />
                <Label htmlFor="default" className="font-normal cursor-pointer" style={{ color: "#323339" }}>
                  Default
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="large" />
                <Label htmlFor="large" className="font-normal cursor-pointer" style={{ color: "#323339" }}>
                  Large
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}
