"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CommandSearch } from "../command-search";
import { Settings2, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Link from "next/link";
import { SidebarNavigation } from "./sidebar-navigation";
import { Subscription } from "db/types/models.types";
import { getPlanDetails } from "@subscription/utils/get-plan-details";
import { SidebarUpgrade } from "./sidebar-upgrade";
interface SidebarClientProps {
  subscription?: Subscription;
}

export const SidebarClient = ({ subscription }: SidebarClientProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    if (window.innerWidth < 768) return false;
    const saved = localStorage.getItem("felinify-sidebar-collapsed");
    return saved === "true";
  });
  const planDetails = getPlanDetails(subscription as Subscription);
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        setCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("felinify-sidebar-collapsed", String(next));
      }
      return next;
    });
  };
  return (
    <div
      className={`${collapsed ? "md:w-[40px]" : "w-64 md:w-64"} transition-all duration-300 flex flex-col flex-grow relative`}
    >
      {!collapsed ? (
        <div className="p-2 bg-white rounded-lg border border-[#E7E6E6] flex items-center gap-2">
          <div className="flex items-center space-x-2 bg-primary p-1 rounded-lg w-fit">
            <Image
              src="/felinify-white.png"
              alt="Felinify"
              width={26}
              height={26}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-primary text-sm">Felinify</span>
            <span className="text-xs text-muted-foreground">
              {planDetails.name.charAt(0).toUpperCase() +
                planDetails.name.slice(1)}{" "}
              plan
            </span>
          </div>
        </div>
      ) : (
        <div className="p-2 bg-primary rounded-lg flex items-center justify-center gap-2">
          <Image
            src="/felinify-white.png"
            alt="Felinify"
            width={26}
            height={26}
          />
        </div>
      )}

      {!collapsed && (
        <div className="bg-white rounded-md border border-[#E7E6E6] mt-3 hidden md:block">
          <CommandSearch triggerClassName="flex items-center w-full pl-8 pr-4 py-2 border-0 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all duration-200 rounded-lg text-sm text-gray-500 relative" />
        </div>
      )}

      <SidebarNavigation collapsed={collapsed} />

      {!collapsed && planDetails.name == "starter" && <SidebarUpgrade />}

      <div
        className={`mt-auto hidden md:flex items-center ${collapsed ? "justify-center" : "justify-between"}`}
      >
        {!collapsed && (
          <Link href="/settings">
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
