"use client";
import { BotMessageSquare, Compass, Home, Library, Trophy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip } from "../ui/tooltip";

const navigationItems = [
  {
    label: "Home",
    icon: Home,
    href: "/home",
  },
  {
    label: "Library",
    icon: Library,
    href: "/library",
  },

  {
    label: "Explore",
    icon: Compass,
    href: "/explore",
  },

  {
    label: "Assistant",
    icon: BotMessageSquare,
    href: "/assistant",
  },

  {
    label: "Leaderboard",
    icon: Trophy,
    href: "/leaderboard",
  },
];

interface SidebarNavigationClientProps {
  collapsed?: boolean;
}

export const SidebarNavigationClient = ({
  collapsed = false,
}: SidebarNavigationClientProps) => {
  const pathname = usePathname();
  const isActive = (path: string) =>
    pathname === path
      ? "bg-white text-primary border border-[#E7E6E6]"
      : "text-muted-foreground border-transparent hover:text-primary";

  return (
    <div className="space-y-1.5">
      {navigationItems.map((item, index) =>
        collapsed ? (
          <Tooltip key={index} content={item.label} side="right">
            <Link
              href={item.href}
              className={`flex justify-center items-center py-2 text-sm font-medium border rounded-md ${isActive(item.href)}`}
            >
              <item.icon className="w-5 h-5" />
            </Link>
          </Tooltip>
        ) : (
          <Link
            href={item.href}
            key={index}
            className={`flex items-center space-x-3 px-3 py-2 text-sm font-medium border rounded-md ${isActive(item.href)}`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        )
      )}
    </div>
  );
};
