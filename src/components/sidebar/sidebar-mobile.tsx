import { Sidebar } from "./sidebar";

export const MobileSidebar = ({ toggleId }: { toggleId: string }) => {
  return (
    <div className="md:hidden">
      <input id={toggleId} type="checkbox" className="peer hidden" />

      <label
        htmlFor={toggleId}
        aria-hidden="true"
        className="fixed inset-0 z-[70] bg-black/30 backdrop-blur-[1px] opacity-0 pointer-events-none transition-opacity duration-200 peer-checked:pointer-events-auto peer-checked:opacity-100"
      />

      <div className="fixed inset-y-0 left-0 z-[80] w-72 -translate-x-full bg-[#F6F8FA] shadow-xl transition-transform duration-200 peer-checked:translate-x-0">
        <div className="h-full overflow-y-auto border-r border-[#E7E6E6] bg-[#F6F8FA]">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};
