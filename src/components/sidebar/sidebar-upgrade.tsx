import { ChevronsUpDown, Crown } from "lucide-react";
import Link from "next/link";

export const SidebarUpgrade = () => {
  return (
    <div className="mt-auto mb-4 p-4 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground rounded-xl shadow-lg border border-primary/20 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-20"></div>
    
    <div className="relative z-10">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
          <Crown className="w-4 h-4 text-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm font-bold text-primary-foreground">
              Unlock Premium Features
            </p>
            <div className="px-2 py-0.5 bg-white/20 rounded-full">
              <span className="text-xs font-semibold text-primary-foreground">PRO</span>
            </div>
          </div>
          <p className="text-xs text-primary-foreground/90 mb-3 leading-relaxed">
            Unlimited energy, AI-powered study modes, and exclusive content
          </p>
          <Link
            href="/settings?tab=subscription&openUpgradeDialog=true"
            className="inline-flex items-center text-xs font-semibold bg-white/20 hover:bg-white/30 text-primary-foreground px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105"
          >
            Upgrade Now
            <ChevronsUpDown className="w-3 h-3 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
};