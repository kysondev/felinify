"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInWithEmail,
  signInWithGithub,
  signInWithGoogle,
} from "@auth/actions/auth.action";
import { Alert, AlertDescription } from "components/ui/Alert";
import { Button } from "components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/Card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/Form";
import { Input } from "components/ui/Input";
import { Loading } from "components/ui/Loading";
import { AUTH_CONFIG, AUTH_DISABLED_MESSAGES } from "@auth/config/auth.config";
import { cn } from "lib/cn";
import { signInSchema } from "@auth/validations/auth.schema";
import dynamic from "next/dynamic";
import NextForm from "next/form";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import OTPSkeleton from "./skeletons/OTPSkeleton";

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
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  const emailForm = useForm<{ email: string }>({
    resolver: zodResolver(signInSchema.pick({ email: true })),
    defaultValues: {
      email: "",
    },
  });

  const passwordForm = useForm<{ password: string }>({
    resolver: zodResolver(signInSchema.pick({ password: true })),
    defaultValues: {
      password: "",
    },
  });

  const handleEmailSubmit = (values: { email: string }) => {
    setEmail(values.email);
    setShowPassword(true);
  };

  const handlePasswordSubmit = async (values: { password: string }) => {
    startTransition(async () => {
      await signInWithEmail(email, values.password, setIsOTPOpen);
    });
  };

  const handleBack = () => {
    setShowPassword(false);
  };

  if (isOTPOpen) {
    return <OTPForm onCancel={() => setIsOTPOpen(false)} />;
  }

  return (
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-1 text-center pb-4">
          <div className="mx-auto mb-2">
            <img src="/felinify.png" alt="Felinify" className="h-10 w-auto" />
          </div>
          <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Login to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {!showPassword && (
              <>
                {!AUTH_CONFIG.isOAuthEnabled && (
                  <Alert className="mb-2">
                    <AlertDescription>
                      {AUTH_DISABLED_MESSAGES.oauth}
                    </AlertDescription>
                  </Alert>
                )}
                <div className="flex flex-col gap-3">
                  <NextForm action={signInWithGithub}>
                    <Button
                      variant="outline"
                      className="w-full relative pl-10"
                      type="submit"
                      disabled={!AUTH_CONFIG.isOAuthEnabled}
                    >
                      <img
                        src="/github.svg"
                        alt="github"
                        className="absolute left-4 h-5 w-5"
                      />
                      <span>Continue with GitHub</span>
                    </Button>
                  </NextForm>
                  <NextForm action={signInWithGoogle}>
                    <Button
                      variant="outline"
                      className="w-full relative pl-10"
                      type="submit"
                      disabled={!AUTH_CONFIG.isOAuthEnabled}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="absolute left-4 h-5 w-5"
                      >
                        <path
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                          fill="currentColor"
                        />
                      </svg>
                      <span>Continue with Google</span>
                    </Button>
                  </NextForm>
                </div>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-3 text-muted-foreground text-xs font-medium">
                    Or continue with email
                  </span>
                </div>
              </>
            )}

            {!showPassword ? (
              <Form {...emailForm}>
                <form
                  onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
                  className="grid gap-4"
                >
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="name@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full mt-2">
                    Continue
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
                  className="grid gap-4"
                >
                  <div className="flex items-center mb-2 text-sm">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto hover:bg-transparent"
                      onClick={handleBack}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                      <span className="text-muted-foreground">{email}</span>
                    </Button>
                  </div>
                  <FormField
                    control={passwordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-sm font-medium">
                            Password
                          </FormLabel>
                          <a
                            href="/auth/forgot-password"
                            className="text-xs text-primary font-medium hover:underline"
                          >
                            Forgot password?
                          </a>
                        </div>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                            autoFocus
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full mt-2"
                  >
                    {isPending ? <Loading isWhite /> : "Sign in"}
                  </Button>
                </form>
              </Form>
            )}

            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a
                href="/auth/signup"
                className="text-primary font-medium hover:underline"
              >
                Sign up
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:text-primary [&_a]:font-medium [&_a]:hover:underline">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
