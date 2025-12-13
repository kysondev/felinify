import Image from "next/image";
import Link from "next/link";
import { Zap, Settings2, Crown, LogOut, Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { getUser, getUserEnergy } from "@user/services/user.service";
import { signOut } from "@auth/actions/auth.action";
import { CommandSearch } from "./command-search";

export const MobileNavbar = async ({
  sidebarToggleId,
}: {
  sidebarToggleId?: string;
}) => {
  const { data: user } = await getUser();
  const energy = await getUserEnergy(user?.id as string);

  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex items-center gap-2">
        <Link href="/home" className="flex items-center">
          <Image
            src="/felinify.png"
            alt="Felinify Logo"
            width={28}
            height={28}
            className="w-7 h-7"
          />
        </Link>
        <div className="flex items-center">
          {sidebarToggleId && (
            <label
              htmlFor={sidebarToggleId}
              className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 cursor-pointer"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </label>
          )}
          <CommandSearch
            iconOnly
            triggerClassName="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-primary/10 rounded-full">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            {energy || 0}
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-lg p-0">
              <Image
                src={
                  user?.image ||
                  "https://res.cloudinary.com/dyu7ogoqc/image/upload/v1754097644/odsjwixha8d48gfswujc.jpg"
                }
                alt="User Avatar"
                width={36}
                height={36}
                className="rounded-lg object-cover w-9 h-9"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 bg-white border border-gray-200 shadow-xl rounded-xl"
            align="end"
          >
            <div className="flex items-center space-x-3 p-4">
              <Image
                src={
                  user?.image ||
                  "https://res.cloudinary.com/dyu7ogoqc/image/upload/v1754097644/odsjwixha8d48gfswujc.jpg"
                }
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
                    {energy || 0} Energy
                  </span>
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/settings" className="w-full">
                <DropdownMenuItem className="cursor-pointer">
                  <Settings2 className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
              </Link>
              <Link
                href="/settings?tab=subscription&openUpgradeDialog=true"
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
            <DropdownMenuItem
              className="cursor-pointer text-red-600"
              onClick={signOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
