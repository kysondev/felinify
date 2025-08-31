"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Library, Compass, BotMessageSquare, Trophy } from "lucide-react";

const navigationItems = [
  {
    label: "Home",
    icon: Home,
    href: "/workspace/home"
  },
  {
    label: "Library",
    icon: Library,
    href: "/workspace/library"
  },
  {
    label: "Explore",
    icon: Compass,
    href: "/workspace/explore"
  },
  {
    label: "Assistant",
    icon: BotMessageSquare,
    href: "/workspace/assistant"
  },
  {
    label: "Leaderboard",
    icon: Trophy,
    href: "/workspace/leaderboard"
  },
];

export const MobileBottomNav = () => {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E7E6E6] md:hidden z-50">
      <div className="flex justify-around">
        {navigationItems.map((item, index) => (
          <Link 
            key={index}
            href={item.href}
            className={`flex flex-col items-center justify-center py-2 flex-1 ${
              isActive(item.href) 
                ? "text-primary" 
                : "text-muted-foreground"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};
