"use client";

import { HOURS, MINUTES, SECONDS } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TimePickerProps = {
  value?: string;
  onChange: (value: string) => void;
};

export function TimePicker({ value, onChange }: TimePickerProps) {
  const [h = "00", m = "00", s = "00"] = value?.split(":") ?? [];

  function updateTime(type: "h" | "m" | "s", val: string) {
    const time = {
      h,
      m,
      s,
      [type]: val,
    };

    onChange(`${time.h}:${time.m}:${time.s}`);
  }

  return (
    <div className="flex ">
      {/* HOUR */}
      <Select value={h} onValueChange={(v) => updateTime("h", v)}>
        <SelectTrigger className="w-[80px] rounded-r-none border-r-0 bg-white">
          <SelectValue placeholder="HH" />
        </SelectTrigger>
        <SelectContent position="popper">
          {HOURS.map((hour) => (
            <SelectItem key={hour} value={hour}>
              {hour}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* MINUTE */}
      <Select value={m} onValueChange={(v) => updateTime("m", v)}>
        <SelectTrigger className="w-[80px] rounded-none border-r-0 border-l-0 bg-white">
          <SelectValue placeholder="MM" />
        </SelectTrigger>
        <SelectContent position="popper">
          {MINUTES.map((min) => (
            <SelectItem key={min} value={min}>
              {min}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* SECOND */}
      <Select value={s} onValueChange={(v) => updateTime("s", v)}>
        <SelectTrigger className="w-[80px] rounded-l-none border-l-0 bg-white">
          <SelectValue placeholder="SS" />
        </SelectTrigger>
        <SelectContent position="popper">
          {SECONDS.map((sec) => (
            <SelectItem key={sec} value={sec}>
              {sec}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
