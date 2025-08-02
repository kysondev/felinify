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

export const getUserWithoutCache = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
    query: {
      disableCookieCache: true,
    },
  });
  if (!session) return { success: false, message: "Unauthorized" };
  return {
    success: true,
    message: "User fetched successfully",
    data: session.user,
  };
};

export const checkUserNameAvailability = async (username: string) => {
  try {
    const user = await db
      .selectFrom("user")
      .selectAll()
      .where("name", "=", username)
      .executeTakeFirst();

    if (
      user &&
      user.name?.toLocaleLowerCase() === username.toLocaleLowerCase()
    ) {
      return {
        success: false,
        message: "Username already exists",
      };
    }
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

export const checkEmailAvailability = async (email: string) => {
  try {
    const user = await db
      .selectFrom("user")
      .selectAll()
      .where("email", "=", email)
      .executeTakeFirst();
    if (user?.email?.toLocaleLowerCase() === email.toLocaleLowerCase()) {
      return {
        success: false,
        message: "Email is already in use",
      };
    }
    return {
      success: true,
      message: "Email is available",
    };
  } catch (error) {
    console.error("Error checking email availability:", error);
    return {
      success: false,
      message: "Error checking email availability",
    };
  }
};

export const getUserWithId = async (id: string) => {
  "use cache";
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

export const getUserEnergy = async (userId: string) => {
  const energy = await db
    .selectFrom("user")
    .select("energy")
    .where("id", "=", userId)
    .executeTakeFirst();

  if (!energy) {
    return 0;
  }

  return energy.energy || 0;
};

export const updateUserEnergy = async (userId: string, energy: number) => {
  try {
    await db
      .updateTable("user")
      .set({ energy })
      .where("id", "=", userId)
      .execute();
    return {
      success: true,
      message: "User energy updated successfully",
    };
  } catch (error) {
    console.error("Error updating user energy:", error);
    return {
      success: false,
      message: "Error updating user energy",
    };
  }
};

export const getUserSubscription = async (userId: string) => {
  "use cache";
  const subscription = await db
    .selectFrom("subscription")
    .selectAll()
    .where("referenceId", "=", userId)
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
