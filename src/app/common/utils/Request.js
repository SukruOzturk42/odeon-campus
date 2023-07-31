import http from "./Axios";
import { API_URL, LOGIN_API_ENDPOINT } from "../constants/CommonConstants";

import { trackPromise } from "react-promise-tracker";

export const request = (options) => {
  let url = options.params
    ? `${API_URL}${options.path}?`
    : `${API_URL}${options.path}`;
  if (options.params && options.params.length) {
    options.params.map((par, index) => {
      return (url += par + "=" + options.values[index] + "&");
    });
  }

  return trackPromise(
    http({
      method: options.method,
      url: url,
      data: options.data,
      responseType: options.responseType,
      headers: options.headers,
    })
  )
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response);
    });
};

export const requestAsync = async (options) => {
  let url = options.params
    ? `${API_URL}${options.path}?`
    : `${API_URL}${options.path}`;
  if (options.params && options.params.length) {
    options.params.map((par, index) => {
      return (url += par + "=" + options.values[index] + "&");
    });
  }
  return await http({
    method: options.method,
    url: url,
    data: options.data,
    responseType: options.responseType,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response);
    });
};

export async function requestAll(requestOptionArray) {
  let optionsArray = [];
  if (requestOptionArray.length) {
    optionsArray = requestOptionArray.map((param, index) => {
      return request(requestOptionArray[index]);
    });
    return await trackPromise(Promise.all(optionsArray));
  }
}

export const loginRequest = (options) => {
  let url = options.params
    ? `${LOGIN_API_ENDPOINT}${options.path}?`
    : `${LOGIN_API_ENDPOINT}${options.path}`;
  if (options.params && options.params.length) {
    options.params.map((par, index) => {
      return (url += par + "=" + options.values[index] + "&");
    });
  }
  return trackPromise(
    http({
      method: options.method,
      url: url,
      data: options.data,
      responseType: options.responseType,
    })
  );
};
export default request;
