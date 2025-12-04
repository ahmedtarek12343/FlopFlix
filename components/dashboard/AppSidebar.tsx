"use client";

import { useState, useEffect } from "react";
import { sidebarItems } from "@/types/constants";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserButton, useUser } from "@clerk/nextjs";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { user, isLoaded } = useUser();
  const { state } = useSidebar();
  const pathname = usePathname();

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-bold">
            FlopFlix
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={
                      pathname === item.url ? "bg-accent text-primary" : ""
                    }
                  >
                    <Link href={item.url}>
                      <item.icon />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {!isLoaded && (
          <div className="flex gap-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div
              style={{ opacity: state === "collapsed" ? 0 : 1 }}
              className="flex flex-col gap-1 mt-2"
            >
              <Skeleton className="w-15 h-3 rounded-2xl" />
              <Skeleton className="w-36 h-3 rounded-2xl" />
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <UserButton />
          <div
            style={{ opacity: state === "collapsed" ? 0 : 1 }}
            className="flex flex-col"
          >
            <div className="flex gap-4">
              <p className="text-sm">{user?.firstName}</p>
              <p className="text-sm">{user?.lastName}</p>
            </div>
            <p className="text-[12px]">
              {user?.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
