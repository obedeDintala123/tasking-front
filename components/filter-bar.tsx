"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, Filter, Plus, Search } from "lucide-react";
import { Input } from "./ui/input";

export function FilterBar() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Search */}
      <div className="relative flex-1 lg:max-w-md">
        <Search
          className="absolute left-3 top-1/2 size-4 -translate-y-1/2"
          style={{ color: "#6b6b75" }}
        />
        <Input placeholder="Search tasks..." className="bg-white pl-10" />
      </div>

      {/* Filters and Add Button */}
      <div className="flex flex-wrap items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 bg-white">
              <Filter className="size-4" />
              Priority
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>All</DropdownMenuItem>
            <DropdownMenuItem>Low</DropdownMenuItem>
            <DropdownMenuItem>Creative</DropdownMenuItem>
            <DropdownMenuItem>Urgent</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 bg-white">
              <Filter className="size-4" />
              Category
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>All</DropdownMenuItem>
            <DropdownMenuItem>Design</DropdownMenuItem>
            <DropdownMenuItem>Development</DropdownMenuItem>
            <DropdownMenuItem>Marketing</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 bg-white">
              <Calendar className="size-4" />
              Due Date
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>All</DropdownMenuItem>
            <DropdownMenuItem>Today</DropdownMenuItem>
            <DropdownMenuItem>This Week</DropdownMenuItem>
            <DropdownMenuItem>This Month</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          size="sm"
          className="gap-2 text-white"
          style={{ backgroundColor: "#8098f0" }}
        >
          <Plus className="size-4" />
          Add Task
        </Button>
      </div>
    </div>
  );
}
