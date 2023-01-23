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

/**
 * Build supplied string by interpolating properties after delimiter ':' with the given parameters.
 *
 * @example
 * interpolate(':name is here.', {name: 'Colly'})
 * => 'Colly is here.'
 *
 * @param {string} str
 * @param {object} params
 * @param {object} queries
 *
 * @returns String.
 */
export function interpolate(str: string, params: {}, queries = {}) {
  if (typeof str !== "string") {
    throw new TypeError("First Argument must be a string");
  }
  let formattedString = str;

  params = params || {}; // default params won't resolve to {} if null is passed.
  for (const [key, value] of Object.entries(params)) {
    const val = value || "";

    formattedString = formattedString.replace(
      new RegExp(":" + key + "\\b", "gi"),
      val.toString()
    );
  }

  if (Object.values(queries).filter((a) => a).length) {
    formattedString += "?";
    Object.entries(queries).forEach(([name, value]) => {
      if (name && value) {
        formattedString += `${name}=${value}&`;
      }
    });
    formattedString = formattedString.slice(0, formattedString.length - 1);
  }

  return formattedString;
}
