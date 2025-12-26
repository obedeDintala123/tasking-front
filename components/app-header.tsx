"use client";

import { useMe } from "@/lib/requests";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
export const AppHeader = () => {
  const dias = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const { data: user } = useMe();

  return (
    <header className="w-full flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <div className="w-10 border h-10 rounded-full flex items-center justify-center">
          {new Date().getDate().toLocaleString()}
        </div>

        <div>
          <span className="text-sm">{dias[new Date().getDay()]}</span>
          <p className="text-xs text-gray-500">
            {new Date()
              .toLocaleDateString("en-Us", { month: "long" })
              .replace(/^\w/, (c) => c.toUpperCase())}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <Avatar className="w-10 h-10">
          <AvatarImage src="#" />
          <AvatarFallback className="border bg-tasking-primary-00 text-white">
            {user?.firstName?.charAt(0).toUpperCase() +
              "" +
              user?.lastName?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div>
          <span className="text-sm">
            {user?.firstName + " " + user?.lastName}
          </span>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
      </div>
    </header>
  );
};
