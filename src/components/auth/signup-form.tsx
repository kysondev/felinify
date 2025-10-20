"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInWithGithub,
  signInWithGoogle,
  signUp,
} from "@auth/actions/auth.action";
import { Alert, AlertDescription } from "@ui/alert";
import { Button } from "@ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { Checkbox } from "@ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { Input } from "@ui/Input";
import { Loading } from "@ui/loading";
import { AUTH_CONFIG, AUTH_DISABLED_MESSAGES } from "@auth/config/auth.config";
import { cn } from "src/lib/cn";
import { signUpSchema, SignUpSchema } from "@auth/validations/auth.schema";
import NextForm from "next/form";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { checkEmailAvailability } from "@user/services/user.service";
import Link from "next/link";
import Image from "next/image";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<"email" | "details">("email");
  const [emailValue, setEmailValue] = useState("");

  const emailForm = useForm<{ email: string }>({
    resolver: zodResolver(signUpSchema.pick({ email: true })),
    defaultValues: {
      email: "",
    },
  });

  const detailsForm = useForm<Omit<SignUpSchema, "email">>({
    resolver: zodResolver(signUpSchema.omit({ email: true })),
    defaultValues: {
      name: "",
      password: "",
      terms: false,
    },
  });

  const handleEmailSubmit = async (values: { email: string }) => {
    const { success, message } = await checkEmailAvailability(values.email);
    if (!success) {
      toast.error(message);
      return;
    }
    setEmailValue(values.email);
    setStep("details");
  };

  const handleDetailsSubmit = async (values: Omit<SignUpSchema, "email">) => {
    startTransition(async () => {
      await signUp(values.name, emailValue, values.password, values.terms);
    });
  };

  const handleBack = () => {
    setStep("email");
  };

  return (
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-1 text-center pb-4">
          <div className="mx-auto mb-2">
            <Image
              src="/felinify.png"
              alt="Felinify"
              className="h-10 w-auto"
              width={40}
              height={40}
            />
          </div>
          <CardTitle className="text-2xl font-semibold">
            Create Account
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Sign up to get started with Felinify
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!AUTH_CONFIG.isSignupEnabled && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>
                {AUTH_DISABLED_MESSAGES.signup}
              </AlertDescription>
            </Alert>
          )}
          {!AUTH_CONFIG.isOAuthEnabled && AUTH_CONFIG.isSignupEnabled && (
            <Alert className="mb-6">
              <AlertDescription>
                {AUTH_DISABLED_MESSAGES.oauth}
              </AlertDescription>
            </Alert>
          )}
          <div className="grid gap-6">
            {step === "email" && (
              <>
                <div className="flex flex-col gap-3">
                  <NextForm action={signInWithGithub}>
                    <Button
                      variant="outline"
                      className="w-full relative pl-10"
                      type="submit"
                      disabled={
                        !AUTH_CONFIG.isSignupEnabled ||
                        !AUTH_CONFIG.isOAuthEnabled
                      }
                    >
                      <Image
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
                      disabled={
                        !AUTH_CONFIG.isSignupEnabled ||
                        !AUTH_CONFIG.isOAuthEnabled
                      }
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
                              disabled={!AUTH_CONFIG.isSignupEnabled}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={!AUTH_CONFIG.isSignupEnabled}
                      className="w-full mt-2"
                    >
                      Continue
                    </Button>
                  </form>
                </Form>
              </>
            )}

            {step === "details" && (
              <Form {...detailsForm}>
                <form
                  onSubmit={detailsForm.handleSubmit(handleDetailsSubmit)}
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
                      <span className="text-muted-foreground">
                        {emailValue}
                      </span>
                    </Button>
                  </div>
                  <FormField
                    control={detailsForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Username
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="JohnDoe"
                            {...field}
                            disabled={!AUTH_CONFIG.isSignupEnabled}
                            autoFocus
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={detailsForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                            disabled={!AUTH_CONFIG.isSignupEnabled}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={detailsForm.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row space-x-3 space-y-0 pt-2 items-center">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={!AUTH_CONFIG.isSignupEnabled}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal gap-1">
                            Accept terms and conditions
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={
                      isPending ||
                      !detailsForm.watch("terms") ||
                      !AUTH_CONFIG.isSignupEnabled
                    }
                    className="w-full mt-2"
                  >
                    {isPending ? <Loading isWhite /> : "Create Account"}
                  </Button>
                </form>
              </Form>
            )}

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:text-primary [&_a]:font-medium [&_a]:hover:underline">
        By clicking continue, you agree to our{" "}
        <Link href="/terms">Terms of Service</Link> and{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </div>
    </div>
  );
}
