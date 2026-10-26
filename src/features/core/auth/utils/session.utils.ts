import { auth } from "@auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const getSessionUser = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
};

export const requireUser = async () => {
  const user = await getSessionUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (!user.usernameSet) {
    redirect("/auth/setup-username");
  }

  return user;
};

export const redirectIfSignedIn = async () => {
  const user = await getSessionUser();

  if (user) {
    redirect("/home");
  }
};
