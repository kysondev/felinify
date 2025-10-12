import { Sidebar } from "components/sidebar/sidebar";
import { MobileNavbar } from "components/mobile-navbar";
import { MobileBottomNav } from "components/mobile-bottom-nav";
import { DesktopNavbar } from "components/desktop-navbar";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#F6F8FA]">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="md:hidden w-full fixed top-0 left-0 right-0 z-50">
          <header className="w-full bg-white border-b border-[#E7E6E6]">
            <div className="flex h-14 items-center justify-between px-4">
              <MobileNavbar />
            </div>
          </header>
        </div>

        <main className="flex-1 overflow-auto bg-white md:rounded-l-xl border border-[#E7E6E6] transition-all duration-300 md:mt-0 mt-14 mb-16 md:mb-0">
          <div className="hidden md:block sticky top-0 z-40 bg-white">
            <DesktopNavbar />
          </div>
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

