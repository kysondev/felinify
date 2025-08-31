import ResetPasswordForm from "components/auth/reset-password-form";
import { Loading } from "components/ui/loading";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Suspense fallback={<Loading />}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
