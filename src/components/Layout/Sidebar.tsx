import Link from "next/link";
import { useRouter } from "next/router";
import { Disclosure } from "@headlessui/react";

import { menuItems } from "./routes";

import Logo from "@/assets/Logo.svg";
import Logout from "@/assets/Logout.svg";
import HamburgerMenu from "@/assets/HamburgerMenu.svg";

const Sidebar = () => {
  const router = useRouter();

  const isActive = (route: string) => {
    if (route === router.pathname) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <Disclosure as="nav">
        <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <HamburgerMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>
        <div className="pl-6 w-1/2 h-screen bg-white z-20 border-r-2 fixed top-0 -left-96 lg:left-0 lg:w-60 peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <div className="sidebar-header flex items-center justify-center py-8">
              <div className="max-w-[10rem]">
                <Link href="/dashboard">
                  <Logo className="text-2xl" />
                </Link>
              </div>
            </div>
            <nav>
              <ul className="border-b border-gray-100 pb-4">
                <li className="flex mb-2 text-grey-400 justify-start pl-5 m-auto text-xs">
                  Menus
                </li>
                {menuItems.map(({ path, name, img }) => (
                  <li
                    className={`flex mb-2 text-grey-500 text-sm justify-start items-center gap-4 pl-5 hover:text-blue-500 p-2 group/item hover:bg-grey-100 cursor-pointer m-auto
                    ${isActive(path) && "text-blue-900 hover:text-blue-400"}
                  `}
                    key={name}
                  >
                    <span className="text-2xl">{img}</span>
                    <Link href={path}>{name}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* logout */}
            <div className=" my-4">
              <div className="flex mb-2 text-grey-500 text-sm justify-start items-center gap-4 pl-5 hover:text-blue-500 p-2 group/item hover:bg-grey-100 cursor-pointer m-auto">
                <Logout className="text-2xl text-gray-600 group-hover:text-white " />
                <span className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  <Link href={"/"}>Logout</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
};

export default Sidebar;
