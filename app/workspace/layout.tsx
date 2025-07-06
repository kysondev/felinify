import { WorkspaceNavbar } from "components/WorkspaceNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WorkspaceNavbar />
      {children}
    </>
  );
}
