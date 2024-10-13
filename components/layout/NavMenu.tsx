"use client";

import * as React from "react";
import {
  BookOpen,
  BookOpenCheck,
  ChevronDown,
  Hotel,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function NavMenu() {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="cursor-pointer flex gap-2 md:gap-4 items-center"
          onClick={() => router.push("/hotel/new")}
        >
          <Plus size={16} />
          <span> Add Hotel</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer flex gap-2 md:gap-4 items-center"
          onClick={() => router.push("/my-hotels")}
        >
          <Hotel size={16} />
          <span> My Hotels</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer flex gap-2 md:gap-4 items-center"
          onClick={() => router.push("/my-bookings")}
        >
          <BookOpenCheck size={16} />
          <span> My Bookingsl</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
