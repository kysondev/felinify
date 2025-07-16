"use client";
import { cn } from "lib/utils";
import { Button } from "components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/Card";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { useState, useTransition } from "react";
import Form from "next/form";
import { signInWithGithub, signInWithGoogle, signUp } from "actions/auth.action";
import { Loading } from "components/ui/Loading";
import { Checkbox } from "components/ui/Checkbox";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isPending, startTransition] = useTransition();
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create Account</CardTitle>
          <CardDescription>
            Sign up with your GitHub or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>

            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
              <Form action={signInWithGithub}>
                <Button variant="outline" className="w-full" type="submit">
                  <img src="/github_light.svg" alt="github" />
                  Sign up with GitHub
                </Button>
              </Form>
              <Form action={signInWithGoogle}>
                <Button variant="outline" className="w-full" type="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Sign up with Google
                </Button>
              </Form>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or sign up with
                </span>
              </div>
              <Form
            action={async (formData) => {
              startTransition(async () => {
                await signUp(formData);
              });
            }}
            className="grid gap-6"
          >
                <div className="grid gap-2">
                  <Label htmlFor="email">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="JohnDoe"
                    name="name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    name="email"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="terms"
                    checked={isChecked}
                    onCheckedChange={(checked) => setIsChecked(!!checked)}
                  />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
                <Button
                  type="submit"
                  disabled={isPending || !isChecked}
                  className={`w-full ${!isChecked ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isPending ? <Loading isWhite /> : "Sign Up"}
                </Button>
              </Form>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/auth/login" className="underline underline-offset-4">
                  Sign In
                </a>
              </div>
            </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
