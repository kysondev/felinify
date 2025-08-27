import { getUser, getUserSubscription } from "@user/services/user.service";
import { Alert } from "components/ui/Alert";
import { Subscription, User } from "db/types/models.types";
import { SettingsTabs } from "components/settings/SettingsTabs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Settings | Felinify",
  description: "Manage your account settings and preferences for Felinify.",
  keywords: ["account settings", "user preferences", "profile management"],
  alternates: {
    canonical: "/workspace/settings",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function SettingsPage() {
  const { data: user } = await getUser();
  const { data: subscription } = await getUserSubscription(user?.id || "");

  return (
    <div className="container max-w-[900px] mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col gap-6 md:gap-8">
        <div>
          <Alert
            variant="destructive"
            className={`mb-3 ${!user?.emailVerified ? "block" : "hidden"}`}
          >
            <span>
              <span className="font-medium">Warning:</span> Your account is not
              verified. Some features may not be available until you verify your
              account.
            </span>
          </Alert>
          <h1 className="text-2xl md:text-3xl font-semibold">Settings</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Manage your account settings and preferences.
          </p>
        </div>
        <SettingsTabs
          user={user as User}
          subscription={(subscription as Subscription) || null}
        />
      </div>
    </div>
  );
}
