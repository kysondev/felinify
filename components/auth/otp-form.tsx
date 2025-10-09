"use client";
import { verifyOTP } from "@auth/actions/auth.action";
import { Button } from "components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "components/ui/input-otp";
import { Loading } from "components/ui/loading";
import { cn } from "lib/cn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

interface OTPFormProps {
  onCancel: () => void;
  className?: string;
  props?: React.ComponentPropsWithoutRef<"div">;
}

const OTPForm = ({ onCancel, className, ...props }: OTPFormProps) => {
  const [otp, setOtp] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }
    startTransition(async () => {
      const result = await verifyOTP(otp.split(""));
      if (result.success) {
        toast.success("Logged in successfully");
        router.push("/workspace");
      } else {
        toast.error(
          result.error || "Invalid verification code. Please try again."
        );
      }
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Verification Code</CardTitle>
          <CardDescription>Enter the code sent to your email.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="flex justify-center gap-2 w-full">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                    name="otp"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending ? <Loading isWhite /> : "Verify Code"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our{" "}
        <Link href="/terms">Terms of Service</Link> and{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </div>
    </div>
  );
};

export default OTPForm;
