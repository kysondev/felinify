import { getUserCredit } from "services/user.service";

export const hasEnoughCredit = async (userId: string, credit: number) => {
  const userCredits = await getUserCredit(userId);

  if (userCredits >= credit) {
    return true;
  } else {
    return false;
  }
};
