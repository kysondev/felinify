import React from "react";
import {
  Compass,
  Library,
  LogOut,
  Menu,
  Settings2,
  Crown,
  Bell,
  Search,
  Zap,
  Trophy,
} from "lucide-react";

import { Button } from "components/ui/Button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "components/ui/Sheet";
import { Badge } from "components/ui/Badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/Dropdown-menu";
import { getUserCredit, getUserWithoutCache } from "services/user.service";
import Link from "next/link";
import Form from "next/form";
import { signOut } from "actions/auth.action";
import Image from "next/image";
import { Input } from "./ui/Input";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
}
const SignOutButton = ({ className }: { className?: string }) => {
  return (
    <Form action={signOut}>
      <button type="submit" className={className}>
        <LogOut className="w-4 h-4 mr-2" />
        Sign out
      </button>
    </Form>
  );
};

const WorkspaceNavbar = async ({
  logo = {
    url: "/workspace/explore",
    alt: "logo",
    title: "Clami",
  },
  menu = [
    {
      title: "Explore",
      url: "/workspace/explore",
      icon: <Compass className="size-4 shrink-0" />,
    },
    {
      title: "Library",
      url: "/workspace/library",
      icon: <Library className="size-4 shrink-0" />,
    },
    {
      title: "Leaderboard",
      url: "/workspace/leaderboard",
      icon: <Trophy className="size-4 shrink-0" />,
    },
  ],
}: Navbar1Props) => {
  const { data: user } = await getUserWithoutCache();
  const userCredits = getUserCredit(user?.id as string);

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="flex h-16 items-center justify-between rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-lg shadow-gray-200/50">
          <div className="flex items-center space-x-3 px-6">
            <Link href={logo.url} className="flex items-center space-x-3 group">
              <Image
                src="/clami.png"
                alt={logo.alt}
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="font-semibold text-primary">{logo.title}</span>
            </Link>
            <div className="hidden md:flex items-center space-x-1">
              {menu.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-3 px-6">
            <div className="hidden lg:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search..."
                className="pl-10 w-64 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all duration-200 rounded-lg"
              />
            </div>
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-primary/10 rounded-full">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {userCredits}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 rounded-lg"
            >
              <Bell className="w-4 h-4 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full hidden" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-lg p-0 hidden md:block"
                >
                  <Image
                    src={user?.image || "/default-avatar.png"}
                    alt="User Avatar"
                    width={36}
                    height={36}
                    className="rounded-lg object-cover"
                  />
                </Button>
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
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      @{user?.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Zap className="w-3 h-3 text-primary" />
                      <span className="text-xs font-medium text-primary">
                        {userCredits} credits
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
                <DropdownMenuItem className="cursor-pointer text-red-600 p-0">
                  <SignOutButton className="w-full text-left px-2 py-1.5 flex items-center h-full" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-9 w-9 rounded-lg"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white">
                <SheetHeader className="pb-6">
                  <SheetTitle>
                    <Link
                      href={logo.url}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">L</span>
                      </div>
                      <span className="text-xl font-semibold text-gray-900">
                        {logo.title}
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search..."
                    className="pl-10 bg-gray-50 border-0 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  {menu.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t">
                  <div className="flex items-center space-x-3 mb-4">
                    <Image
                      src={user?.image || "/default-avatar.png"}
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">
                        @{user?.name}
                      </p>
                      <div className="flex items-center space-x-1">
                        <Zap className="w-3 h-3 text-primary" />
                        <span className="text-sm text-gray-500">
                          {userCredits} credits
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Link href="/workspace/settings" className="w-full">
                      <Button variant="ghost" className="w-full justify-start">
                        <Settings2 className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                    </Link>
                    <Link
                      href="/workspace/settings?tab=subscription&openUpgradeDialog=true"
                      className="w-full"
                    >
                      <Button variant="ghost" className="w-full justify-start">
                        <Crown className="w-4 h-4 mr-2" />
                        <span className="flex-1 text-left">Upgrade Plan</span>
                        <Badge className="bg-primary/10 text-primary text-xs">
                          PRO
                        </Badge>
                      </Button>
                    </Link>
                    <div className="w-full px-2">
                      <SignOutButton className="w-full flex gap-2 items-center text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200" />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export { WorkspaceNavbar };
