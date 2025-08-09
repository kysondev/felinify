import { NextRequest, NextResponse } from "next/server";
import {
  checkUserNameAvailability,
  getUser,
} from "@user/services/user.service";
import { customAlphabet } from "nanoid";
import { auth } from "@auth/auth";

export const GET = async (request: NextRequest) => {
  const { data: user } = await getUser();
  const nanoid = customAlphabet("0123456789", 8);

  if (!user || !user.name) {
    console.error("User not found or username missing");
    return NextResponse.redirect(new URL("/workspace", request.url));
  }

  if (Date.now() - user.createdAt.getTime() > 5 * 60 * 1000) {
    console.error("User is not new");
    return NextResponse.redirect(new URL("/workspace", request.url));
  }

  const isUserNameTaken = await checkUserNameAvailability(user.name);

  if (!isUserNameTaken.success) {
    await auth.api.updateUser({
      body: { name: `${user.name}${nanoid()}` },
      headers: request.headers,
    });
    console.error("Username is taken");
    return NextResponse.redirect(new URL("/workspace", request.url));
  }

  const isValidUsername = /^[a-zA-Z0-9]+$/.test(user.name);

  if (isValidUsername) {
    console.error("Username is valid");
    return NextResponse.redirect(new URL("/workspace", request.url));
  }

  let normalizedUsername;

  const alphanumericOnly = user.name.replace(/[^a-zA-Z0-9]/g, "");

  if (alphanumericOnly.length >= 3) {
    normalizedUsername = alphanumericOnly;
  } else {
    console.error("Username is not valid");
    normalizedUsername = `user${nanoid()}`;
  }

  try {
    await auth.api.updateUser({
      body: { name: normalizedUsername },
      headers: request.headers,
    });

    return NextResponse.redirect(new URL("/workspace", request.url));
  } catch (error) {
    console.error("Error updating username:", error);
    return NextResponse.redirect(new URL("/workspace", request.url));
  }
};
