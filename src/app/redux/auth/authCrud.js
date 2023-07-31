import axios from "axios";
import { loginRequest } from "../../common/utils/Request";

export const LOGIN_URL = "api/auth/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = "api/me";

export function login(username, password) {
  const data = {
    username,
    password,
  };
  const options = {
    method: "post",
    path: "login",
    data: data,
  };
  return loginRequest(options);
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  return {
    data: { user: "AS" },
  };
}
