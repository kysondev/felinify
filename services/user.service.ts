"use server";
import { auth } from "lib/auth";
import { headers } from "next/headers";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { db } from "lib/db";

export const getUser = async () => {
  const getCachedUser = async (headersList: ReadonlyHeaders) => {
    "use cache";
    const session = await auth.api.getSession({
      headers: headersList,
    });
    if (!session) return { success: false, message: "Unauthorized" };
    return {
      success: true,
      message: "User fetched successfully",
      data: session.user,
    };
  };
  const headersList = await headers();
  return getCachedUser(headersList);
};

export const getUserWithId = async (id: string) => {
  try {
    const user = await db
      .selectFrom("user")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();
    return {
      success: true,
      message: "User fetched successfully",
      data: user,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return {
      success: false,
      message: "Error fetching user",
    };
  }
};

export const getUserCredit = async (userId: string) => {
  const credit = await db
    .selectFrom("user")
    .select("credits")
    .where("id", "=", userId)
    .executeTakeFirst();

  if (!credit) {
    return 0;
  }

  return credit.credits || 0;
};

export const updateUserCredit = async (userId: string, credit: number) => {
  try {
    await db
      .updateTable("user")
      .set({ credits: credit })
      .where("id", "=", userId)
      .execute();
    return {
      success: true,
      message: "User credit updated successfully",
    };
  } catch (error) {
    console.error("Error updating user credit:", error);
    return {
      success: false,
      message: "Error updating user credit",
    };
  }
};

export const getUserSubscription = async () => {
  const { data: user } = await getUser();
  if (!user) {
    return { success: false, message: "Unauthorized" };
  }
  const subscription = await db
    .selectFrom("subscription")
    .selectAll()
    .where("referenceId", "=", user.id)
    .where("status", "=", "active")
    .executeTakeFirst();

  if (!subscription) {
    return { success: false, message: "No subscription found" };
  }

  return {
    success: true,
    message: "Subscription fetched successfully",
    data: subscription,
  };
};
