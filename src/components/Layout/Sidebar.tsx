import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { menuItems } from "./routes";
import { removeTokens } from "@/services/token";

import Logout from "@/assets/Logout.svg";
import BackArrow from "@/assets/BackArrow.png";

const Sidebar: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const router = useRouter();

  const isActive = (route: string) => {
    if (route === router.pathname) {
      return true;
    }
    return false;
  };

  console.log("open, setOpen", open, setOpen);

  return (
    <aside
      id="default-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform  ${
        open ? "sm:translate-x-full" : "-translate-x-full sm:translate-x-0"
      }`}
      aria-label="Sidebar"
    >
      {open && (
        <Image
          src={BackArrow}
          className="absolute cursor-pointer rounded-full -right-4 h-10 w-10 top-9 border-2 border-blue-600 "
          alt="image"
        />
      )}

      <div className="h-full px-3 py-4 overflow-y-auto bg-grey-100 bg-grey-800">
        <ul className="space-y-2">
          {menuItems.map(({ path, name, img }) => (
            <li
              className={`flex items-center p-2 text-base font-normal rounded-lg text-grey-500 hover:bg-grey-100 hover:bg-grey-700
                    ${isActive(path) && "text-grey-100"}
                  `}
              key={name}
            >
              <span className="w-6 h-6 text-grey-500 transition duration-75 text-grey-500  ">
                {img}
              </span>
              <Link href={path} className="ml-3">
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* logout */}
        <div className="my-4">
          <div className="flex items-center p-2 text-base font-normal  rounded-lg text-grey-500 hover:bg-grey-100 hover:bg-grey-700">
            <span className="w-6 h-6 text-grey-500 transition duration-75 text-grey-500  ">
              <Logout className="text-2xl text-grey-500" />
            </span>
            <Link href={"/login"} className="ml-3" onClick={removeTokens}>
              Logout
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
