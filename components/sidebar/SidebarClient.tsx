"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CommandSearch } from "../CommandSearch";
import {
  Settings2,
  ChevronsUpDown,
  PanelLeftClose,
  PanelLeftOpen,
  Zap,
  Crown,
  LogOut,
  X,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/Dropdown-menu";
import Form from "next/form";
import { SidebarNavigation } from "./sidebar-navigation";
import { Subscription, User } from "db/types/models.types";
import { getPlanDetails } from "@subscription/utils/get-plan-details";
import { Badge } from "components/ui/Badge";
import { SidebarUpgrade } from "./sidebar-upgrade";
import { signOut } from "@auth/actions/auth.action";

interface SidebarClientProps {
  user?: User;
  subscription?: Subscription;
  userEnergy?: number;
}

export const SidebarClient = ({
  subscription,
  user,
  userEnergy,
}: SidebarClientProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const planDetails = getPlanDetails(subscription as Subscription);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  const SignOutButton = ({ className }: { className?: string }) => {
    return (
      <button type="submit" className={className}>
        <LogOut className="w-4 h-4 mr-2" />
        Sign out
      </button>
    );
  };

  return (
    <div
      className={`${collapsed ? "w-[40px]" : "w-64"} transition-all duration-300 flex flex-col flex-grow relative`}
    >

      {!collapsed ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="p-2 bg-white rounded-lg border border-[#E7E6E6] flex items-center gap-2 cursor-pointer">
              <div className="flex items-center space-x-2 bg-primary p-1 rounded-lg w-fit">
                <Image
                  src="/clami-white.png"
                  alt="Clami"
                  width={26}
                  height={26}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-primary text-sm">
                  Clami
                </span>
                <span className="text-xs text-muted-foreground">
                  {planDetails.name.charAt(0).toUpperCase() +
                    planDetails.name.slice(1)}{" "}
                  Plan
                </span>
              </div>
              <ChevronsUpDown className="w-4 h-4 text-muted-foreground ml-auto" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 bg-white border border-gray-200 shadow-xl rounded-xl hidden md:block"
            align="end"
          >
            <div className="flex items-center space-x-3 p-4">
              <Image
                src={user?.image || "/default-avatar.png"}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-lg object-cover w-10 h-10"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  @{user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "user@example.com"}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <Zap className="w-3 h-3 text-primary" />
                  <span className="text-xs font-medium text-primary">
                    {userEnergy || 0} Energy
                  </span>
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/workspace/settings" className="w-full">
                <DropdownMenuItem className="cursor-pointer">
                  <Settings2 className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
              </Link>
              <Link
                href="/workspace/settings?tab=subscription&openUpgradeDialog=true"
                className="w-full"
              >
                <DropdownMenuItem className="cursor-pointer">
                  <Crown className="w-4 h-4 mr-2" />
                  <div className="flex items-center justify-between w-full">
                    <span>Upgrade Plan</span>
                    <Badge className="bg-primary/10 text-primary text-xs">
                      PRO
                    </Badge>
                  </div>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
              <Form action={signOut}>
                <DropdownMenuItem className="cursor-pointer text-red-600 p-0 w-full">
                  <SignOutButton className="w-full text-left px-2 py-1.5 flex items-center h-full" />
                </DropdownMenuItem>
              </Form>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="p-2 bg-primary rounded-lg flex items-center justify-center gap-2">
          <Image src="/clami-white.png" alt="Clami" width={26} height={26} />
        </div>
      )}

      {!collapsed && (
        <div className="bg-white rounded-md border border-[#E7E6E6] mt-3">
          <CommandSearch triggerClassName="flex items-center w-full pl-8 pr-4 py-2 border-0 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all duration-200 rounded-lg text-sm text-gray-500 relative" />
        </div>
      )}

      <SidebarNavigation collapsed={collapsed} />

      {!collapsed && planDetails.name == "free" && (
        <SidebarUpgrade />
      )}

      <div
        className={`mt-auto flex items-center ${collapsed ? "justify-center" : "justify-between"}`}
      >
        {!collapsed && (
          <Link href="/workspace/settings">
            <Settings2 className="w-4 h-4 text-muted-foreground cursor-pointer" />
          </Link>
        )}
        {collapsed ? (
          <PanelLeftOpen
            onClick={toggleSidebar}
            className="w-5 h-5 text-muted-foreground cursor-pointer"
          />
        ) : (
          <PanelLeftClose
            onClick={toggleSidebar}
            className="w-5 h-5 text-muted-foreground cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};
