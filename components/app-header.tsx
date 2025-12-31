"use client";

import { useMe } from "@/lib/requests";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarTrigger } from "./ui/sidebar";
import { ChevronDown, Menu } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";
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

  const colors = [
    "bg-tasking-primary-00",
    "bg-tasking-primary-10",
    "bg-tasking-primary-20",
    "bg-tasking-primary-30",
  ];

  function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const { data: user, isLoading } = useMe();
 
  const isMobile = useIsMobile();

  return (
    <header className="w-full flex items-center justify-between p-4">
      {isMobile ? (
        <SidebarTrigger icon={Menu} />
      ) : (
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
      )}

      {user?.team && (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center outline-none gap-2 text-base p-2 px-6 text-tasking-primary-40 rounded-full">
            <span className="font-normal">
              {user?.team?.name.charAt(0).toLocaleUpperCase() +
                user?.team?.name.slice(1)}
            </span>
            <ChevronDown className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="px-2">
              <span className="text-sm">Members</span>
              <Separator />
            </div>
            {user.team.users.map((item, index) => {
              const color = randomColor();
              return (
                <DropdownMenuItem key={index}>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${color} text-base`}
                    >
                      {item.firstName.charAt(0).toUpperCase()}{" "}
                    </div>
                    <span className="text-xs">
                      {item.firstName} {item.lastName}
                    </span>
                  </div>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <div className="flex items-start gap-2">
        {isLoading ? (
          <Skeleton className="w-10 h-10 rounded-full " />
        ) : (
          <Avatar className="w-10 h-10">
            <AvatarImage src="#" />
            <AvatarFallback className="border bg-tasking-primary-00 text-white">
              {user?.firstName?.charAt(0).toUpperCase() +
                "" +
                user?.lastName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}

        {isLoading ? (
          <div>
            <Skeleton className="w-20 h-4 mt-1 " />
            <Skeleton className="w-14 h-3 mt-1 " />
          </div>
        ) : (
          <div className="hidden md:flex flex-col">
            <span className="text-sm">
              {user?.firstName + " " + user?.lastName}
            </span>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        )}
      </div>
    </header>
  );
};
