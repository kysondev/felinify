import { getUserEnergy } from "@user/services/user.service";

export const hasEnoughEnergy = async (userId: string, energy: number) => {
  const userEnergy = await getUserEnergy(userId);

  if (userEnergy >= energy) {
    return { success: true, energy: userEnergy };
  } else {
    return { success: false, energy: userEnergy };
  }
};
