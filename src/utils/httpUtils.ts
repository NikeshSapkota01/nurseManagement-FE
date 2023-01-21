import axios, { AxiosRequestConfig } from "axios";

import {
  getRefreshToken,
  saveAccessToken,
  getAccessToken,
  removeTokens,
} from "@/services/token";
import endpoints from "src/constants/endpoint";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Http GET.
 *
 * @param {string} url
 * @param {Object} params
 * @param {string} responseType
 *
 * @returns {Promise}
 */
export function get(url: string, params = {}) {
  const request = {
    method: "get",
    url: url,
    params: params,
  };

  return http(request);
}

/**
 * Http POST.
 *
 * @param {string} url
 * @param {Object} data
 * @returns  {Promise}
 */
export function post(url: string, data = {}) {
  const request = {
    method: "post",
    url: url,
    data: data,
  };

  return http(request);
}

/**
 * Http PUT.
 *
 * @param {string} url
 * @param {Object} data
 * @returns {Promise}
 */
export function put(url: string, data = {}) {
  const request = {
    method: "put",
    url: url,
    data: data,
  };

  return http(request);
}

/**
 * Http DELETE.
 *
 * @param {string} url
 * @param {Object} data
 * @returns {Promise}
 */
export function remove(url: string, data = {}) {
  const request = {
    method: "delete",
    data,
    url,
  };

  return http(request);
}

/**
 * Auto adds the bearer token in Authorization Header.
 */
const requestInterceptor = async (request: AxiosRequestConfig<any>) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    request.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return request;
};

/**
 * Gets accessToken from refreshToken
 * If access token can't be get then clears the tokens
 */
export async function responseInterceptor(err: any) {
  const error = err?.response || err;

  const originalRequest = error.config;

  const refreshToken = getRefreshToken();

  if (!refreshToken) return removeTokens();

  if (error.status === 401 && error.data.message === "Unauthorized access!") {
    try {
      return http
        .post(endpoints.auth.token, { refreshToken })
        .then(({ data }) => {
          saveAccessToken(data.data.accessToken);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${data.data.accessToken}`;
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${data.data.accessToken}`;
          return http(originalRequest);
        });
    } catch (error) {
      removeTokens();
    }
  }

  return Promise.reject(error);
}

http.interceptors.request.use(requestInterceptor);
http.interceptors.response.use((response) => response, responseInterceptor);
