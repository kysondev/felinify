import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/Tabs";
import { getUser } from "services/user.service";
import { AccountSettings } from "components/settings/AccountSettings";
import { PaymentSettings } from "components/settings/PaymentSettings";
import { User } from "generated/prisma-client";
import { Alert } from "components/ui/Alert";

export default async function SettingsPage() {
  const { data: user } = await getUser();
  return (
    <div className="container max-w-[900px] mx-auto py-6 px-4 md:py-10 md:px-6 mt-16">
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
            <AccountSettings user={user as User} />
          </TabsContent>

          <TabsContent value="payment" className="mt-6">
            <PaymentSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
