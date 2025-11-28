import { LandingNavbar } from "@components/landing-navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh flex-col overflow-x-hidden bg-gradient-to-b from-background to-muted">
      <LandingNavbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
