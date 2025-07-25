import { db } from "lib/db";

export const refillCredits = async (dateNow: Date) => {
  try {
    const subscriptionsData = await db
      .selectFrom("subscription")
      .select(["stripeCustomerId", "plan"])
      .execute();

    const customerPlans = new Map();
    for (const sub of subscriptionsData) {
      if (sub.stripeCustomerId) {
        customerPlans.set(sub.stripeCustomerId, sub.plan);
      }
    }

    await db.transaction().execute(async (trx) => {
      const usersNeedingRefill = await trx
        .selectFrom("user")
        .select(["id", "stripeCustomerId"])
        .where((eb) =>
          eb.or([
            eb("lastCreditRefillAt", "is", null),
            eb(
              "lastCreditRefillAt",
              "<",
              new Date(dateNow.getTime() - 24 * 60 * 60 * 1000)
            ),
          ])
        )
        .execute();

      const usersByPlan = {
        starter: [] as string[],
        pro: [] as string[],
        ultra: [] as string[],
      };

      for (const user of usersNeedingRefill) {
        const plan = user.stripeCustomerId
          ? customerPlans.get(user.stripeCustomerId)
          : null;

        if (!plan) {
          usersByPlan.starter.push(user.id);
        } else if (plan.startsWith("pro")) {
          usersByPlan.pro.push(user.id);
        } else if (plan.startsWith("ultra")) {
          usersByPlan.ultra.push(user.id);
        }
      }

      if (usersByPlan.starter.length > 0) {
        await trx
          .updateTable("user")
          .set({
            credits: 10,
            lastCreditRefillAt: dateNow,
          })
          .where("id", "in", usersByPlan.starter)
          .execute();
      }

      if (usersByPlan.pro.length > 0) {
        await trx
          .updateTable("user")
          .set({
            credits: 50,
            lastCreditRefillAt: dateNow,
          })
          .where("id", "in", usersByPlan.pro)
          .execute();
      }

      if (usersByPlan.ultra.length > 0) {
        await trx
          .updateTable("user")
          .set({
            credits: 100,
            lastCreditRefillAt: dateNow,
          })
          .where("id", "in", usersByPlan.ultra)
          .execute();
      }
    });

    return { success: true, message: "Credits refilled" };
  } catch (error) {
    console.error("Credit refill error:", error);
    return {
      success: false,
      message: "Failed to refill credits",
      error: error,
    };
  }
};

export const refillCreditsForUser = async (userId: string) => {
  try {
    const user = await db
      .selectFrom("user")
      .selectAll()
      .where("id", "=", userId)
      .executeTakeFirst();

    if (!user) {
      console.error("User not found with ID:", userId);
      return { success: false, message: "User not found" };
    }

    let creditAmount = 10;
    if (user.stripeCustomerId) {
      const subscription = await db
        .selectFrom("subscription")
        .select(["plan"])
        .where("stripeCustomerId", "=", user.stripeCustomerId)
        .executeTakeFirst();

      if (subscription) {
        if (subscription.plan.startsWith("pro")) {
          creditAmount = 50;
        } else if (subscription.plan.startsWith("ultra")) {
          creditAmount = 100;
        }
      }
    }

    await db
      .updateTable("user")
      .set({
        credits: creditAmount,
        lastCreditRefillAt: new Date(),
      })
      .where("id", "=", user.id)
      .execute();

    return {
      success: true,
      message: `Credits refilled for user: ${creditAmount} credits added`,
      data: { credits: creditAmount },
    };
  } catch (error) {
    console.error("Credit refill error for user:", error);
    return {
      success: false,
      message: "Failed to refill credits for user",
      error: error,
    };
  }
};
