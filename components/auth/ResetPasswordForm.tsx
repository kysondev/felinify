"use client";
import { resetPassword } from "actions/auth.action";
import { Loading } from "components/ui/loading";
import Form from "next/form";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import toast from "react-hot-toast";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing token");
      redirect("/auth/forgot-password");
    }
  }, [token]);
  return (
    <>
      <Form
        action={async (formData) => {
          startTransition(async () => {
            await resetPassword(formData, token as string);
          });
        }}
        className="space-y-5"
      >
        <div>
          <label
            htmlFor="password"
            className="block text-xs font-medium text-gray-400 mb-1.5"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            className="w-full px-3 py-2 rounded-sm bg-[#232323] text-white border border-[#333333] focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="confirm"
            className="block text-xs font-medium text-gray-400 mb-1.5"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm"
            name="confirm"
            placeholder="••••••••"
            className="w-full px-3 py-2 rounded-sm bg-[#232323] text-white border border-[#333333] focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white font-medium py-2 px-3 text-sm rounded-sm hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors mt-2"
        >
          {isPending ? <Loading /> : "Reset"}
        </button>
      </Form>
    </>
  );
};
export default ResetPasswordForm;
