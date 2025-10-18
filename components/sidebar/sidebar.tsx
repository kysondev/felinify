import { SidebarClient } from "./sidebar-client";
import {
  getUser,
  getUserEnergy,
  getUserSubscription,
} from "@user/services/user.service";
import { User } from "db/types/models.types";

export const Sidebar = async () => {
  const { data: user } = await getUser();
  const { data: subscription } = await getUserSubscription(user?.id as string);
  const energy = await getUserEnergy(user?.id as string);
  return (
    <aside className="h-screen flex flex-col p-4 transition-all duration-300">
      <SidebarClient
        user={user as User}
        userEnergy={energy}
        subscription={subscription}
      />
    </aside>
  );
};
