import { LoginForm } from "components/auth/LoginForm";

export default function Page() {
  return (
    <div className="min-h-svh bg-gradient-to-b from-background to-muted flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-sm mx-auto">
        <LoginForm />
      </div>
    </div>
  );
}
