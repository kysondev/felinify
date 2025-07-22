import { NextResponse } from "next/server";
import crypto from "crypto";
import { getUser } from "services/user.service";

export async function GET() {
  try {
    const { success } = await getUser();

    if (!success) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const timestamp = Math.floor(Date.now() / 1000);

    const paramsToSign = `timestamp=${timestamp}`;

    const signature = crypto
      .createHash("sha1")
      .update(paramsToSign + process.env.NEXT_PUBLIC_CLOUDINARY_SECRET)
      .digest("hex");

    return NextResponse.json({ signature, timestamp });
  } catch (error) {
    console.error("Signature generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate signature" },
      { status: 500 }
    );
  }
}
