import cookies from "@/utils/cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "src/constants/constant";

import jwt_decode from "jwt-decode";

export const saveTokens = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  cookies.set(ACCESS_TOKEN, accessToken);
  cookies.set(REFRESH_TOKEN, refreshToken);
};

export const saveAccessToken = (accessToken: string) => {
  cookies.set(ACCESS_TOKEN, accessToken);
};

export const getAccessToken = () => {
  return cookies.get(ACCESS_TOKEN);
};

export const getRefreshToken = () => {
  return cookies.get(REFRESH_TOKEN);
};

export const removeTokens = () => {
  cookies.del(ACCESS_TOKEN);
  cookies.del(REFRESH_TOKEN);
};

export const parseUserToken = (token: string) => {
  return jwt_decode(token);
};

export const parseToken = () => {
  try {
    const accessToken = cookies.get(ACCESS_TOKEN);
    const decodedToken = jwt_decode(accessToken);

    if (accessToken && decodedToken) {
      return decodedToken;
    }

    const refreshToken = cookies.get(REFRESH_TOKEN);
    const decodedRefreshToken = jwt_decode(refreshToken);

    if (refreshToken && decodedRefreshToken) {
      return decodedRefreshToken;
    }
  } catch (err) {
    removeTokens();
    return null;
  }

  return null;
};
