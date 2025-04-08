"use client";

import type React from "react";

import { Menu, ChevronLeft } from "lucide-react";
import { useSidebar } from "./sidebar";
import { cn } from "@/lib/utils";

interface SidebarTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SidebarTrigger({ className, ...props }: SidebarTriggerProps) {
  const { collapsed, setCollapsed, isMobile } = useSidebar();

  return (
    <button
      className={cn("btn btn-ghost btn-sm", className)}
      onClick={() => {
        if (isMobile) {
          setCollapsed((prev) => ({
            ...prev,
            mobile: !prev.mobile,
          }));
        } else {
          setCollapsed((prev) => ({
            ...prev,
            desktop: !prev.desktop,
          }));
        }
      }}
      {...props}
    >
      {isMobile ? (
        <Menu className="h-4 w-4" />
      ) : collapsed.desktop ? (
        <Menu className="h-4 w-4" />
      ) : (
        <ChevronLeft className="h-4 w-4" />
      )}
      {/*<span className="sr-only">Toggle Sidebar</span>*/}
    </button>
  );
}
