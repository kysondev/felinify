import { NextResponse } from "next/server";
import crypto from "crypto";
import { getUser } from "@user/services/user.service";

export async function GET() {
  try {
    const { success } = await getUser();

    if (!success) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // The client gets the cloud name and api key from here instead of reading
    // NEXT_PUBLIC_ vars, so uploads need no Cloudinary config at build time.
    // The NEXT_PUBLIC_ names stay as a fallback for images built with them.
    const cloudName =
      process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey =
      process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      console.error("Cloudinary environment variables are not configured");
      return NextResponse.json(
        { error: "Image uploads are not configured" },
        { status: 503 }
      );
    }

    const timestamp = Math.floor(Date.now() / 1000);

    const paramsToSign = `timestamp=${timestamp}`;

    const signature = crypto
      .createHash("sha1")
      .update(paramsToSign + apiSecret)
      .digest("hex");

    return NextResponse.json({ signature, timestamp, cloudName, apiKey });
  } catch (error) {
    console.error("Signature generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate signature" },
      { status: 500 }
    );
  }
}
