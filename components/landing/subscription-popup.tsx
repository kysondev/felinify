"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/Input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof formSchema>;

interface SubscriptionPopupProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export function SubscriptionPopup({
  open: propOpen,
  setOpen: propSetOpen,
}: SubscriptionPopupProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false);

  const open = propOpen !== undefined ? propOpen : internalOpen;
  const setOpen = propSetOpen || setInternalOpen;
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (propOpen === undefined && propSetOpen === undefined) {
      const timer = setTimeout(() => {
        const hasSubscribed = localStorage.getItem("emailSubscribed");
        if (!hasSubscribed) {
          setInternalOpen(true);
        }
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [propOpen, propSetOpen]);

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
        toast.success("Thank you for subscribing!");
        localStorage.setItem("emailSubscribed", "true");
        setOpen(false);
        reset();
      } else {
        toast.error(result.error || "Failed to subscribe");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-0 shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="bg-primary p-6 md:w-1/3 flex flex-col justify-center items-center text-white">
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 mx-auto mb-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              <h3 className="text-xl font-bold mb-2">Be the first</h3>
              <p className="text-sm opacity-90">
                Get early access and exclusive offers
              </p>
            </div>
          </div>

          <div className="p-6 md:w-2/3 bg-white">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Stay Updated
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Subscribe to our newsletter to be notified when Felinify
                launches!
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Input
                    id="email"
                    className="h-11 px-4 border-gray-300 focus:ring-primary focus:border-primary"
                    placeholder="Enter your email address"
                    {...register("email")}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                    disabled={isLoading}
                    className="flex-1 h-11 border-gray-300 hover:bg-gray-50"
                  >
                    Maybe Later
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 h-11 bg-primary hover:bg-primary/80 text-white"
                  >
                    {isLoading ? "Subscribing..." : "Subscribe Now"}
                  </Button>
                </div>

                <p className="text-xs text-center text-gray-500 mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
