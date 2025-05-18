import { client, setAuthHeader } from "../../api/client";
import type { Login, Credentials } from "./types";

export const login = async (credentials: Credentials) => {
  const response = await client.post<Login>("/auth/login", credentials);
    const { accessToken } = response.data;
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
