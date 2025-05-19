import { client, removeAuthHeader, setAuthHeader } from "../../api/client";
import storage from "../../utils/storage";
import type { Login, Credentials } from "./types";

//************************************************************************************* */
// Asynchronous function to log in a user using their credentials
// It sends a POST request to the "/auth/login" endpoint with the provided credentials
// The function expects the credentials to be of type Credentials, which includes username and password
//************************************************************************************* */

export const login = async (credentials: Credentials) => {
  const response = await client.post<Login>("/auth/login", credentials);
  const { accessToken } = response.data;
  storage.set("auth", accessToken);
  setAuthHeader(accessToken);
};

export const logout = async () => {
  storage.remove("auth");
  removeAuthHeader();
};
 