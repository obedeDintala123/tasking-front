"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PreferenceSettings() {
  const [language, setLanguage] = useState("en")
  const [timezone, setTimezone] = useState("utc")
  const [dateFormat, setDateFormat] = useState("mdy")

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transition-shadow hover:shadow-md lg:col-span-2">
      <h2 className="text-xl font-semibold mb-6" style={{ color: "#323339" }}>
        Preferences
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Language Selector */}
        <div className="space-y-2">
          <Label htmlFor="language" style={{ color: "#323339" }}>
            Language
          </Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language" style={{ borderColor: "#e5e5e5" }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="ja">Japanese</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Time Zone Selector */}
        <div className="space-y-2">
          <Label htmlFor="timezone" style={{ color: "#323339" }}>
            Time Zone
          </Label>
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger id="timezone" style={{ borderColor: "#e5e5e5" }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="utc">UTC (GMT+0)</SelectItem>
              <SelectItem value="est">Eastern (GMT-5)</SelectItem>
              <SelectItem value="cst">Central (GMT-6)</SelectItem>
              <SelectItem value="mst">Mountain (GMT-7)</SelectItem>
              <SelectItem value="pst">Pacific (GMT-8)</SelectItem>
              <SelectItem value="jst">Tokyo (GMT+9)</SelectItem>
              <SelectItem value="gmt">London (GMT+0)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Format Selector */}
        <div className="space-y-2">
          <Label htmlFor="dateFormat" style={{ color: "#323339" }}>
            Date & Time Format
          </Label>
          <Select value={dateFormat} onValueChange={setDateFormat}>
            <SelectTrigger id="dateFormat" style={{ borderColor: "#e5e5e5" }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mdy">MM/DD/YYYY (12-hour)</SelectItem>
              <SelectItem value="dmy">DD/MM/YYYY (24-hour)</SelectItem>
              <SelectItem value="ymd">YYYY-MM-DD (24-hour)</SelectItem>
              <SelectItem value="iso">ISO 8601</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
