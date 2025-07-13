"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/Tabs";
import { User } from "db/types/models.types";
import dynamic from "next/dynamic";
import AccountTabSkeleton from "./skeletons/AccountTabSkeleton";

const AccountSettings = dynamic(
  () =>
    import("components/settings/AccountSettings").then((mod) => ({
      default: mod.AccountSettings,
    })),
  {
    loading: () => <AccountTabSkeleton />,
    ssr: false,
  }
);

const PaymentSettings = dynamic(
  () =>
    import("components/settings/PaymentSettings").then((mod) => ({
      default: mod.PaymentSettings,
    })),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-200 h-32 rounded-md"></div>
    ),
    ssr: false,
  }
);

interface SettingsTabsProps {
  user: User;
}

export function SettingsTabs({ user }: SettingsTabsProps) {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="w-full max-w-full md:max-w-[400px] grid grid-cols-2">
        <TabsTrigger value="account" className="flex-1">
          Account
        </TabsTrigger>
        <TabsTrigger value="payment" className="flex-1">
          Payment
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="space-y-6 mt-6">
        <AccountSettings user={user} />
      </TabsContent>
      <TabsContent value="payment" className="mt-6">
        <PaymentSettings />
      </TabsContent>
    </Tabs>
  );
}
