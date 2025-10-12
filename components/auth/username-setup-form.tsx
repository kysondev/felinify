"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/Input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { setupUsername } from "@auth/actions/auth.action";
import { checkUserNameAvailability } from "@user/services/user.service";
import { usernameSchema } from "@auth/validations/auth.schema";
import { useRouter } from "next/navigation";

export function UsernameSetupForm() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const router = useRouter();

  const checkUsernameAvailability = async (value: string) => {
    const validation = usernameSchema.safeParse({ username: value });
    if (!validation.success) {
      setIsValid(false);
      setError(validation.error.issues[0].message);
      return;
    }

    setIsChecking(true);
    try {
      const result = await checkUserNameAvailability(value);
      setIsValid(result.success);
      if (!result.success) {
        setError(result.message || "Username is not available");
      } else {
        setError("");
      }
    } catch (err) {
      setIsValid(false);
      setError("Error checking username availability");
    } finally {
      setIsChecking(false);
    }
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    setError("");
    setIsValid(null);

    if (value.length >= 3) {
      const timeoutId = setTimeout(() => {
        checkUsernameAvailability(value);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = usernameSchema.safeParse({ username });
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    if (isValid !== true) {
      setError("Please wait for username validation to complete");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await setupUsername(username);
      if (result.success) {
        router.push("/library");
      } else {
        setError(result.message || "Failed to set username");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Username Setup</CardTitle>
        <CardDescription>
          Choose a unique username for your account. This will be visible to
          other users.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                placeholder="Enter your username"
                className="pr-10"
                disabled={isLoading}
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {isChecking && (
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                )}
                {!isChecking && isValid === true && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
                {!isChecking && isValid === false && (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Username must be 3-20 characters long and contain only letters and
              numbers
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || isValid !== true || !username}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Setting up username...
              </>
            ) : (
              "Complete Setup"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
