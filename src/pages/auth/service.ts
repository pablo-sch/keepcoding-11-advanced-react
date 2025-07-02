const AUTH_LOGIN = import.meta.env.VITE_AUTH_LOGIN;

import { client, removeAuthorizationHeader, setAuthorizationHeader } from "../../api/client";
import storage from "../../utils/storage";
import type { Login, Credentials } from "./types";

export const login = async (credentials: Credentials, remember: boolean) => {
  const response = await client.post<Login>(AUTH_LOGIN, credentials);
  const { accessToken } = response.data;

  storage.set("auth", accessToken, remember ? "local" : "session");

  setAuthorizationHeader(accessToken);
};

export const logout = async () => {
  storage.remove("auth");
  removeAuthorizationHeader();
};
