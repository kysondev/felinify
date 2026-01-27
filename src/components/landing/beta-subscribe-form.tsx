"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/Input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Mail } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof formSchema>;

export function BetaSubscribeForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/email/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Thank you for subscribing! We'll be in touch.");
        reset();
      } else {
        toast.error(result.error || "Failed to subscribe. Please try again.");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm sm:max-w-md mx-auto">
      <div className="relative flex items-center border-2 border-border/50 rounded-full transition-colors focus-within:border-primary/80 bg-background/20 backdrop-blur-sm">
        <Mail className="absolute left-4 sm:left-5 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground pointer-events-none" />
        <Input
          id="email"
          type="email"
          className="h-12 sm:h-14 w-full appearance-none rounded-full border-0 bg-transparent pl-10 sm:pl-14 pr-28 sm:pr-36 text-sm sm:text-base placeholder:text-muted-foreground focus:ring-0"
          placeholder="Enter your email"
          {...register("email")}
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="absolute right-1.5 top-1/2 h-9 sm:h-11 -translate-y-1/2 rounded-full px-4 sm:px-6 text-xs sm:text-sm font-semibold"
        >
          {isLoading ? "Subscribing..." : "Notify Me"}
        </Button>
      </div>
      {errors.email && (
        <p className="mt-2 text-center text-sm text-red-500">
          {errors.email.message}
        </p>
      )}
    </form>
  );
}
