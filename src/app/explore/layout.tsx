import { getUser } from "@user/services/user.service";
import { Sidebar } from "@components/sidebar/sidebar";
import { MobileNavbar } from "@components/mobile-navbar";
import { DesktopNavbar } from "@components/desktop-navbar";
import { LandingNavbar } from "@components/landing-navbar";
import { Footer } from "@components/landing/footer";
import { MobileSidebar } from "@components/sidebar/sidebar-mobile";

export default async function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user } = await getUser();
  const mobileSidebarToggleId = "mobile-sidebar-toggle";

  if (user) {
    return (
      <div className="flex h-screen bg-[#F6F8FA]">
        <div className="w-0 md:w-auto md:flex-shrink-0">
          <div className="hidden md:block">
            <Sidebar />
          </div>
          <MobileSidebar toggleId={mobileSidebarToggleId} />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="md:hidden w-full fixed top-0 left-0 right-0 z-50">
            <header className="w-full bg-white border-b border-[#E7E6E6]">
              <div className="flex h-14 items-center justify-between px-4">
                <MobileNavbar sidebarToggleId={mobileSidebarToggleId} />
              </div>
            </header>
          </div>

          <main className="flex-1 overflow-auto bg-white md:rounded-l-xl border border-[#E7E6E6] transition-all duration-300 md:mt-0 mt-14">
            <div className="hidden md:block sticky top-0 z-40 bg-white">
              <DesktopNavbar />
            </div>
            {children}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      <div className="relative">
        <LandingNavbar />
      </div>
      <div className="px-4 max-w-[1200px] mx-auto">
        {children}
        <Footer />
      </div>
    </div>
  );
}
