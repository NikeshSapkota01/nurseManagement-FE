import axios from "axios";

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
