import { SidebarClient } from "./sidebar-client";
import { getUser, getUserSubscription } from "@user/services/user.service";

export const Sidebar = async () => {
  const { data: user } = await getUser();
  const { data: subscription } = await getUserSubscription(user?.id as string);
  return (
    <aside className="h-screen flex flex-col p-4 transition-all duration-300">
      <SidebarClient subscription={subscription} />
    </aside>
  );
};
