import Cookies from "universal-cookie";

const cookies = new Cookies();

const cookieObject = {
  get: (key: string) => cookies.get(key),
  set: (key: string, value: any) =>
    cookies.set(key, value, {
      path: "/",
    }),
  del: (key: string) => cookies.remove(key),
};

export default cookieObject;
