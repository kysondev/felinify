import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Zap, Settings2, Crown, LogOut } from "lucide-react";
import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/Dropdown-menu";
import { Badge } from "./ui/Badge";
import { CommandSearch } from "./CommandSearch";
import {
  getUser,
  getUserEnergy
} from "@user/services/user.service";

export const DesktopNavbar = async () => {
  const { data: user } = await getUser();
  const energy = await getUserEnergy(user?.id as string);

  return (
    <header className="w-full bg-white border-b border-[#E7E6E6] px-6 py-3">
      <div className="flex items-center justify-between">

        <div className="flex-1 max-w-md">
          <CommandSearch 
            triggerClassName="flex items-center w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 hover:bg-white focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all duration-200 rounded-lg text-sm text-gray-500 relative"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {energy || 0}
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-lg p-0 hover:bg-gray-100">
                <Image
                  src={user?.image || "/default-avatar.png"}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-lg object-cover w-10 h-10"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-72 bg-white border border-gray-200 shadow-xl rounded-xl"
              align="end"
            >
              <div className="flex items-center space-x-3 p-4">
                <Image
                  src={user?.image || "/default-avatar.png"}
                  alt="User Avatar"
                  width={48}
                  height={48}
                  className="rounded-lg object-cover w-12 h-12"
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
                      {energy || 0} Energy
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
              <Link href="/auth/login">
                <DropdownMenuItem className="cursor-pointer text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
