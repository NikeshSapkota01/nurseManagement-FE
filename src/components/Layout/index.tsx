import * as React from "react";

import Sidebar from "./Sidebar";
import HamburgerMenu from "@/assets/HamburgerMenu.svg";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <div className="flex flex-auto">
      <>
        {!open && (
          <button
            onClick={handleClick}
            className="inline-flex items-center p-2 h-10 mt-2 ml-3 text-sm text-grey-500 rounded-lg md:hidden hover:bg-grey-100 focus:outline-none focus:ring-2 focus:ring-grey-200 text-grey-400 hover:bg-grey-700 focus:ring-grey-600"
          >
            <span className="sr-only">Open sidebar</span>
            <HamburgerMenu />
          </button>
        )}
        <Sidebar open={open} setOpen={setOpen} />
      </>
      <div className="p-4 sm:ml-64">
        <div className="m-5">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
