"use client";
import { resetPassword } from "@auth/actions/auth.action";
import { Loading } from "@ui/loading";
import { cn } from "src/lib/cn";
import Form from "next/form";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { Input } from "@ui/Input";
import { Label } from "@ui/label";
import { Button } from "@ui/button";
import Link from "next/link";

const ResetPasswordForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing token");
      redirect("/auth/forgot-password");
    }
  }, [token]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>Enter your new password</CardDescription>
        </CardHeader>
        <CardContent>
          <Form
            action={async (formData) => {
              startTransition(async () => {
                await resetPassword(formData, token as string);
              });
            }}
            className="grid gap-6"
          >
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirm"
                  name="confirm"
                  placeholder="••••••••"
                />
              </div>

              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? <Loading isWhite /> : "Reset Password"}
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:text-primary [&_a]:font-medium">
        By clicking continue, you agree to our{" "}
        <Link href="/terms" className="hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="hover:underline">
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
};

export default ResetPasswordForm;
