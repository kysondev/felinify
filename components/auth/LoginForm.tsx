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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/Form";
import { useState, useTransition } from "react";
import NextForm from "next/form";
import {
  signInWithEmail,
  signInWithGithub,
  signInWithGoogle,
} from "actions/auth.action";
import { Loading } from "components/ui/Loading";
import dynamic from "next/dynamic";
import OTPSkeleton from "./skeletons/OTPSkeleton";
import { useForm } from "react-hook-form";
import { SignInSchema, signInSchema } from "lib/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AUTH_CONFIG, AUTH_DISABLED_MESSAGES } from "config/auth.config";
import { Alert, AlertDescription } from "components/ui/Alert";

const OTPForm = dynamic(() => import("./OTPForm"), {
  loading: () => <OTPSkeleton />,
  ssr: false,
});

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isPending, startTransition] = useTransition();
  const [isOTPOpen, setIsOTPOpen] = useState(false);

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInSchema) => {
    startTransition(async () => {
      await signInWithEmail(values.email, values.password, setIsOTPOpen);
    });
  };

  if (isOTPOpen) {
    return <OTPForm onCancel={() => setIsOTPOpen(false)} />;
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your email and password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {!AUTH_CONFIG.isOAuthEnabled && (
              <Alert className="mb-2">
                <AlertDescription>{AUTH_DISABLED_MESSAGES.oauth}</AlertDescription>
              </Alert>
            )}
            <div className="flex flex-col gap-4">
              <NextForm action={signInWithGithub}>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  type="submit"
                  disabled={!AUTH_CONFIG.isOAuthEnabled}
                >
                  <img src="/github_light.svg" alt="github" />
                  Login with GitHub
                </Button>
              </NextForm>
              <NextForm action={signInWithGoogle}>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  type="submit"
                  disabled={!AUTH_CONFIG.isOAuthEnabled}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </NextForm>
            </div>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="m@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <a
                          href="/auth/forgot-password"
                          className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  disabled={isPending} 
                  className="w-full"
                >
                  {isPending ? <Loading isWhite /> : "Sign in"}
                </Button>
              </form>
            </Form>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/auth/signup" className="underline underline-offset-4">
                Sign up
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
