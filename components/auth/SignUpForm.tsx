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
import { useTransition } from "react";
import NextForm from "next/form";
import {
  signInWithGithub,
  signInWithGoogle,
  signUp,
} from "actions/auth.action";
import { Loading } from "components/ui/Loading";
import { Checkbox } from "components/ui/Checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpSchema } from "lib/validations/auth.schema";
import { Alert, AlertDescription } from "components/ui/Alert";
import { AUTH_CONFIG, AUTH_DISABLED_MESSAGES } from "config/auth.config";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const onSubmit = async (values: SignUpSchema) => {
    startTransition(async () => {
      await signUp(values.name, values.email, values.password, values.terms);
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create Account</CardTitle>
          <CardDescription>
            Sign up with your email and password
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!AUTH_CONFIG.isSignupEnabled && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{AUTH_DISABLED_MESSAGES.signup}</AlertDescription>
            </Alert>
          )}
          {!AUTH_CONFIG.isOAuthEnabled && AUTH_CONFIG.isSignupEnabled && (
            <Alert className="mb-6">
              <AlertDescription>{AUTH_DISABLED_MESSAGES.oauth}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <NextForm action={signInWithGithub}>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  type="submit"
                  disabled={!AUTH_CONFIG.isSignupEnabled || !AUTH_CONFIG.isOAuthEnabled}
                >
                  <img src="/github_light.svg" alt="github" />
                  Sign up with GitHub
                </Button>
              </NextForm>
              <NextForm action={signInWithGoogle}>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  type="submit"
                  disabled={!AUTH_CONFIG.isSignupEnabled || !AUTH_CONFIG.isOAuthEnabled}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Sign up with Google
                </Button>
              </NextForm>
            </div>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or sign up with
              </span>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input 
                          type="text" 
                          placeholder="JohnDoe" 
                          {...field} 
                          disabled={!AUTH_CONFIG.isSignupEnabled}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          disabled={!AUTH_CONFIG.isSignupEnabled}
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
                      <FormLabel>Password</FormLabel>
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
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={!AUTH_CONFIG.isSignupEnabled}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Accept terms and conditions</FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isPending || !form.watch("terms") || !AUTH_CONFIG.isSignupEnabled}
                  className="w-full"
                >
                  {isPending ? <Loading isWhite /> : "Sign Up"}
                </Button>
              </form>
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
