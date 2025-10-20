"use client";

import { UsernameSetupForm } from "../../../components/auth/username-setup-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { initializeUsername } from "@auth/actions/auth.action";

export default function UsernameSetupPage() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [needsManualSetup, setNeedsManualSetup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleInitializeUsername = async () => {
      try {
        const result = await initializeUsername();
        
        if (result.success && result.redirectTo) {
          router.push(result.redirectTo);
        } else {
          setNeedsManualSetup(true);
        }
      } catch (error) {
        console.error("Error initializing username:", error);
        setNeedsManualSetup(true);
      } finally {
        setIsInitializing(false);
      }
    };

    handleInitializeUsername();
  }, [router]);

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Setting up your account...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!needsManualSetup) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
            Choose Your Username
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Please choose a username to complete your account setup
          </p>
        </div>
        <UsernameSetupForm />
      </div>
    </div>
  );
}
