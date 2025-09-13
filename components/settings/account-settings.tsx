"use client";

import { useState, useRef } from "react";
import { Button } from "components/ui/button";
import { Card } from "components/ui/card";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/label";
import { Avatar, AvatarImage } from "components/ui/avatar";
import { Badge } from "components/ui/badge";
import { Separator } from "components/ui/separator";
import {
  Save,
  Upload,
  Loader2,
  KeyRound,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { authClient } from "@auth/auth-client";
import { Switch } from "components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog";
import {
  PasswordChangeSchema,
  passwordChangeSchema,
} from "@user/validations/user.schema";
import { usernameSchema } from "@auth/validations/auth.schema";
import { User } from "db/types/models.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { useRouter } from "next/navigation";
import { upload } from "@common/actions/upload.action";
import { checkUserNameAvailability } from "@user/services/user.service";

export function AccountSettings({ user }: { user: User }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [show2FADialog, setShow2FADialog] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [password, setPassword] = useState("");
  const [isSendingVerification, setIsSendingVerification] = useState(false);
  const [username, setUsername] = useState(user?.name || "");
  const [usernameError, setUsernameError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const passwordForm = useForm<PasswordChangeSchema>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const hasChanges =
    username !== (user?.name || "") || !!selectedFile || !!imagePreview;

  const validateUsername = () => {
    try {
      usernameSchema.parse({ username });
      setUsernameError("");
      return true;
    } catch (error) {
      const message =
        error instanceof z.ZodError
          ? error.errors[0].message
          : "Invalid username";
      setUsernameError(message);
      return false;
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (usernameError) validateUsername();
  };

  const handleProfileSave = async () => {
    if (!user.emailVerified) {
      toast.error("Please verify your email before updating your profile");
      return;
    }

    if (!validateUsername()) return;

    setIsSaving(true);

    try {
      if (username !== user?.name) {
        const isUsernameTaken = await checkUserNameAvailability(username);

        if (!isUsernameTaken.success) {
          toast.error("Username is taken");
          return;
        }
      }

      if (username !== user?.name) {
        await authClient.updateUser({ name: username });
      }

      if (selectedFile) {
        await upload(selectedFile);
      }

      if (hasChanges) {
        toast.success("Profile updated successfully");
        setSelectedFile(null);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating your profile");
    } finally {
      setIsSaving(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordChangeSchema) => {
    if (!user.emailVerified) {
      toast.error("Please verify your email before changing your password");
      return;
    }

    try {
      const response = await authClient.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      if (response.error) {
        toast.error(response.error.message || "Failed to change password");
        return;
      }

      toast.success("Password changed successfully");
      passwordForm.reset();
      await authClient.signOut();
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("An error occurred while changing your password");
    }
  };

  const toggle2FA = async () => {
    if (!password) {
      toast.error("Password is required");
      return;
    }

    setIsVerifying(true);

    try {
      const isEnabled = user?.twoFactorEnabled;
      const response = isEnabled
        ? await authClient.twoFactor.disable({ password })
        : await authClient.twoFactor.enable({ password });

      if (response.error) {
        toast.error("Incorrect password");
        return;
      }

      toast.success(
        `Two-factor authentication ${isEnabled ? "disabled" : "enabled"}`
      );
      setShow2FADialog(false);
      setPassword("");
    } catch (error) {
      console.error("Error verifying password:", error);
      toast.error("Failed to verify password");
    } finally {
      setIsVerifying(false);
      router.refresh();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImagePreview(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const removeSelectedImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };

  const handleResendVerification = async () => {
    if (user.emailVerified) return;

    setIsSendingVerification(true);
    try {
      const { error } = await authClient.sendVerificationEmail({
        email: user.email,
      });

      if (error) {
        toast.error(error.message || "Failed to send verification email");
        return;
      }

      toast.success("Verification email sent successfully");
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast.error("An error occurred while sending verification email");
    } finally {
      setIsSendingVerification(false);
    }
  };

  const displayImage =
    imagePreview ||
    user?.image ||
    "https://res.cloudinary.com/dyu7ogoqc/image/upload/v1754097644/odsjwixha8d48gfswujc.jpg";

  return (
    <div className="space-y-6">
      <Card className="p-4 md:p-6 relative">
        {hasChanges && (
          <div className="absolute top-4 right-4 md:top-6 md:right-6">
            <Button
              onClick={handleProfileSave}
              size="sm"
              className="flex items-center gap-1"
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>{isSaving ? "Saving..." : "Save"}</span>
            </Button>
          </div>
        )}
        <h2 className="text-lg md:text-xl font-semibold mb-4">Profile</h2>
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="flex flex-col items-center gap-2 mx-auto md:mx-0">
            <Avatar className="h-20 w-20 md:h-24 md:w-24 border border-border relative">
              {isSaving && selectedFile && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-full z-10">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              <AvatarImage src={displayImage} alt="Profile picture" />
            </Avatar>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />

            <div className="flex gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 md:flex-auto flex items-center gap-1"
                onClick={() => fileInputRef.current?.click()}
                disabled={isSaving}
              >
                <Upload className="h-4 w-4" />
                <span>Select Photo</span>
              </Button>

              {selectedFile && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-none"
                  onClick={removeSelectedImage}
                  disabled={isSaving}
                >
                  ✕
                </Button>
              )}
            </div>
          </div>
          <div className="flex-1 space-y-4 w-full">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  data-error={!!usernameError}
                />
                {usernameError && (
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {usernameError}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user?.email || ""}
                    className="w-full"
                    disabled
                  />
                  <div className="flex gap-2 items-center">
                    <Badge
                      variant={user?.emailVerified ? "default" : "secondary"}
                      className="mt-1 sm:mt-0"
                    >
                      {user?.emailVerified ? "Verified" : "Unverified"}
                    </Badge>
                    {!user?.emailVerified && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex items-center gap-1 mt-1 sm:mt-0 text-primary hover:text-primary w-fit px-0 hover:underline hover:bg-transparent"
                        onClick={handleResendVerification}
                        disabled={isSendingVerification}
                      >
                        <span>Resend</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4">Security</h2>
        <div className="space-y-6">
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
              className="space-y-4"
            >
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="password" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={passwordForm.formState.isSubmitting}
              >
                {passwordForm.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </form>
          </Form>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch
                checked={user?.twoFactorEnabled as boolean}
                onCheckedChange={() => setShow2FADialog(true)}
              />
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={show2FADialog} onOpenChange={setShow2FADialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              {user?.twoFactorEnabled ? "Disable" : "Enable"} Two-Factor
              Authentication
            </DialogTitle>
            <DialogDescription>
              Please enter your password to{" "}
              {user?.twoFactorEnabled ? "disable" : "enable"} two-factor
              authentication.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="2fa-password" className="text-left">
                Password
              </Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="2fa-password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-error={!password && password !== ""}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShow2FADialog(false);
                setPassword("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={toggle2FA} disabled={isVerifying || !password}>
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
