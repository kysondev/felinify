import { SidebarNavigationClient } from "./sidebar-navigation-client";

interface SidebarNavigationProps {
  collapsed?: boolean;
}

export const SidebarNavigation = ({
  collapsed = false,
}: SidebarNavigationProps) => {
  return (
    <nav className="mt-3 flex-1">
      <SidebarNavigationClient collapsed={collapsed} />
    </nav>
  );
};
