import { client, setAuthHeader } from "../../api/client";
import type { Login, Credentials } from "./types";

// Asynchronous function to log in a user using their credentials
// It sends a POST request to the "/auth/login" endpoint with the provided credentials
// The function expects the credentials to be of type Credentials, which includes username and password
export const login = async (credentials: Credentials) => {
  const response = await client.post<Login>("/auth/login", credentials);
  const { accessToken } = response.data;

  // Setting the Authorization header with the access token for future API requests
  setAuthHeader(accessToken);
    
  //console.log(accessToken);
};

/* export const login = async (credentials: Credentials) => {
    const response = await client.post("/auth/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
        throw new Error("Login failed");
    }
    
    const data = await response.json();
    return data;
}; */
