"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { Subscription, User } from "db/types/models.types";
import dynamic from "next/dynamic";
import AccountTabSkeleton from "./skeletons/account-tab-skeleton";
import SubscriptionTabSkeleton from "./skeletons/subscription-tab-skeleton";

const AccountSettings = dynamic(
  () =>
    import("components/settings/account-settings").then((mod) => ({
      default: mod.AccountSettings,
    })),
  {
    loading: () => <AccountTabSkeleton />,
    ssr: false,
  }
);

const SubscriptionSettings = dynamic(
  () =>
    import("components/settings/subscription-settings").then((mod) => ({
      default: mod.SubscriptionSettings,
    })),
  {
    loading: () => <SubscriptionTabSkeleton />,
    ssr: false,
  }
);

interface SettingsTabsProps {
  user: User;
  subscription?: Subscription | null;
}

export function SettingsTabs({ user, subscription }: SettingsTabsProps) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("account");

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "subscription" || tabParam === "account") {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="w-full max-w-full md:max-w-[400px] grid grid-cols-2">
        <TabsTrigger value="account" className="flex-1">
          Account
        </TabsTrigger>
        <TabsTrigger value="subscription" className="flex-1">
          Subscription
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="space-y-6 mt-6">
        <AccountSettings user={user} />
      </TabsContent>
      <TabsContent value="subscription" className="mt-6">
        <SubscriptionSettings
          user={user}
          subscription={subscription || undefined}
        />
      </TabsContent>
    </Tabs>
  );
}
