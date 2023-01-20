import * as React from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full px-2 pl-[14%]">{props.children}</div>
    </div>
  );
};

export default Layout;
