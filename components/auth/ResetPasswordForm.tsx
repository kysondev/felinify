"use client";
import { resetPassword } from "@auth/actions/auth.action";
import { Loading } from "components/ui/Loading";
import { cn } from "lib/cn";
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
} from "components/ui/Card";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { Button } from "components/ui/Button";

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
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default ResetPasswordForm;
