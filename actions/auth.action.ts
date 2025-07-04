import { authClient } from "lib/auth-client";
import { signInSchema, signUpSchema } from "lib/validations/auth.schema";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const signUp = async (formData: FormData) => {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!name || !email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    const result = signUpSchema.safeParse({
      name,
      email,
      password,
    });
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
    });
    if (error) {
      toast.error(error.message as string);
      return;
    }
    toast.success("Account created successfully");
  } catch (error) {
    toast.error("Something went wrong");
  }
  redirect("/workspace/library");
};

export const signInWithEmail = async (
  formData: FormData,
  setIsOTPOpen: any
) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    const result = signInSchema.safeParse({
      email,
      password,
    });
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/workspace/library",
      fetchOptions: {
        onSuccess: async (ctx) => {
          if (ctx.data.twoFactorRedirect) {
            const { data } = await authClient.twoFactor.sendOtp();
            if (data) {
              setIsOTPOpen(true);
            }
          } else {
            toast.success("Logged in successfully");
          }
        },
      },
    });
    if (error) {
      toast.error(error.message as string);
      return;
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};

export const signInWithGoogle = async () => {
  try {
    const { error } = await authClient.signIn.social({
      provider: "google",
    });
    if (error) {
      toast.error(error.message as string);
      return;
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};

export const signInWithGithub = async () => {
  try {
    const { error } = await authClient.signIn.social({
      provider: "github",
    });
    if (error) {
      toast.error(error.message as string);
      return;
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};

export const verifyOTP = async (otp: string[]) => {
  try {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }
    const { error } = await authClient.twoFactor.verifyOtp({
      code: otpString,
    });
    if (error) {
      toast.error("Invalid verification code. Please try again.");
      return;
    }
    toast.success("Logged in successfully");
  } catch (err) {
    toast.error("Something went wrong. Please try again.");
    return;
  }
  redirect("/");
};

export const forgotPassword = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    if (!email) {
      toast.error("Please fill all the fields");
      return;
    }
    const { error } = await authClient.forgetPassword({
      email,
      redirectTo: "/auth/reset-password",
    });
    if (error) {
      toast.error(error.message as string);
      return;
    }
    toast.success("Email sent successfully");
  } catch (err) {
    toast.error("Something went wrong. Please try again.");
  }
};

export const resetPassword = async (formData: FormData, token: string) => {
  try {
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;
    if (!password || !confirm) {
      toast.error("Please fill all the fields");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    const { error } = await authClient.resetPassword({
      newPassword: password,
      token,
    });
    if (error) {
      toast.error(error.message as string);
      return;
    }
    toast.success("Password reset successfully");
  } catch (err) {
    toast.error("Something went wrong. Please try again.");
    return;
  }
  redirect("/auth/login");
};
