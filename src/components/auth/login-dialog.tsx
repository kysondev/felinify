"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@ui/dialog";
import { Button } from "@ui/button";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

export function LoginDialog({
  open,
  onOpenChange,
  title = "Sign in required",
  description = "You need to be signed in to perform this action.",
}: LoginDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogIn className="h-5 w-5" />
            {title}
          </DialogTitle>
          <DialogDescription className="text-base">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button asChild className="w-full">
            <Link href="/auth/login">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/auth/signup">
              <UserPlus className="h-4 w-4 mr-2" />
              Create Account
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
