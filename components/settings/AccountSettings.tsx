"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "components/ui/Button";
import { Card } from "components/ui/Card";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { Avatar, AvatarImage } from "components/ui/Avatar";
import { Badge } from "components/ui/Badge";
import { Separator } from "components/ui/Separator";
import {
  Save,
  Upload,
  Loader2,
  KeyRound,
  ShieldCheck,
  Lock,
  Mail,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { upload } from "services/cloudinary.service";
import { authClient } from "lib/auth-client";
import { Switch } from "components/ui/Switch";
import { User } from "generated/prisma-client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "components/ui/Dialog";
import { passwordSchema, usernameSchema } from "lib/validations/user.schema";

export function AccountSettings({ user }: { user: User }) {
  const [username, setUsername] = useState(user?.name || "");
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [is2FAEnabled, setIs2FAEnabled] = useState(user?.twoFactorEnabled);
  const [show2FADialog, setShow2FADialog] = useState(false);
  const [password, setPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSendingVerification, setIsSendingVerification] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const usernameChanged = username !== (user?.name || "");
    const imageChanged = !!selectedFile || !!imagePreview;
    setHasChanges(usernameChanged || imageChanged);
  }, [username, selectedFile, imagePreview, user]);

  const handleSave = async () => {
    if (!user.emailVerified) {
      toast.error("Please verify your email before updating your profile");
      return;
    }
    const result = usernameSchema.safeParse(username);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    setIsSaving(true);

    try {
      if (username !== user?.name) {
        await authClient.updateUser({
          name: username,
        });
      }

      if (selectedFile) {
        const response = await upload(selectedFile);

        if (response.success && response.data) {
          await authClient.updateUser({
            image: response.data.secure_url,
          });
          toast.success("Profile updated successfully");
        } else {
          toast.error(response.message || "Failed to upload image");
          setIsSaving(false);
          return;
        }
      } else if (username !== user?.name) {
        toast.success("Profile updated successfully");
      }

      setHasChanges(false);
      setSelectedFile(null);

      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating your profile");
    } finally {
      setIsSaving(false);
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

  const handlePasswordChange = async () => {
    if (!user.emailVerified) {
      toast.error("Please verify your email before changing your password");
      return;
    }
    if (!currentPassword) {
      toast.error("Current password is required");
      return;
    }

    if (!newPassword) {
      toast.error("New password is required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const result = passwordSchema.safeParse(newPassword);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    setIsChangingPassword(true);

    try {
      const response = await authClient.changePassword({
        currentPassword,
        newPassword,
      });

      if (response.error) {
        toast.error(response.error.message || "Failed to change password");
        return;
      }

      toast.success("Password changed successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      await authClient.signOut();
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("An error occurred while changing your password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const verify2FAPassword = async () => {
    if (!password) {
      toast.error("Password is required");
      return;
    }

    setIsVerifying(true);

    try {
      if (user?.twoFactorEnabled) {
        const response = await authClient.twoFactor.disable({
          password,
        });
        if (response.error) {
          toast.error("Incorrect password");
          return;
        }
      } else {
        const response = await authClient.twoFactor.enable({
          password,
        });
        if (response.error) {
          toast.error("Incorrect password");
          return;
        }
      }

      setIs2FAEnabled(!is2FAEnabled);
      toast.success(
        `Two-factor authentication ${!is2FAEnabled ? "enabled" : "disabled"}`
      );

      setShow2FADialog(false);
      setPassword("");
    } catch (error) {
      console.error("Error verifying password:", error);
      toast.error("Failed to verify password");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendVerification = async () => {
    if (user.emailVerified) return;

    setIsSendingVerification(true);
    try {
      const { error } = await authClient.sendVerificationEmail({
        email: user.email,
        callbackURL: "/workspace/settings",
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

  const displayImage = imagePreview || user?.image || "/default-avatar.png";

  return (
    <div className="space-y-6">
      <Card className="p-4 md:p-6 relative">
        {hasChanges && (
          <div className="absolute top-4 right-4 md:top-6 md:right-6">
            <Button
              onClick={handleSave}
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
              {isSaving && (
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
                onClick={() => {
                  fileInputRef.current?.click();
                }}
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
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <div>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
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
      </Card>

      <Card className="p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4">Security</h2>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="current-password"
                  type="password"
                  className="pl-10"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button
              className="w-full sm:w-auto"
              onClick={handlePasswordChange}
              disabled={
                isChangingPassword ||
                !currentPassword ||
                !newPassword ||
                !confirmPassword
              }
            >
              {isChangingPassword ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </div>

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
                checked={is2FAEnabled as boolean}
                onCheckedChange={() => {
                  setShow2FADialog(true);
                }}
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
              {is2FAEnabled ? "Disable" : "Enable"} Two-Factor Authentication
            </DialogTitle>
            <DialogDescription>
              Please enter your password to{" "}
              {is2FAEnabled ? "disable" : "enable"} two-factor authentication.
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
            <Button
              onClick={verify2FAPassword}
              disabled={isVerifying || !password}
            >
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
