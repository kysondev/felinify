import { getUserEnergy } from "services/user.service";

export const hasEnoughEnergy = async (userId: string, energy: number) => {
  const userEnergy = await getUserEnergy(userId);

  if (userEnergy >= energy) {
    return true;
  } else {
    return false;
  }
};
