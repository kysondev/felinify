import { LandingNavbar } from "@components/landing-navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-hidden">
      <LandingNavbar />
      {children}
    </div>
  );
}
