import { NextResponse } from "next/server";
import { refillEnergy } from "services/energy-refill.service";

export const POST = async (req: Request) => {
  const key = req.headers.get("x-refill-api-key");
  if (key !== process.env.REFILL_API_KEY) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const result = await refillEnergy(new Date());
  if (result.success) {
    return NextResponse.json({ message: result.message });
  } else {
    return NextResponse.json(
      { message: result.message, error: result.error },
      { status: 500 }
    );
  }
};
