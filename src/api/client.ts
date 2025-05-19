import axios from "axios";

//************************************************************************************* */
// Creating an axios instance with a predefined base URL
// The base URL is loaded from an environment variable (e.g., VITE_API_BASE_URL)
//************************************************************************************* */

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

//************************************************************************************* */
// Function to set the Authorization header for all future requests made by the axios client
// It sets the header to include a Bearer token, commonly used for authentication
//************************************************************************************* */

export const setAuthHeader = (accesToken: string) => {
  client.defaults.headers.common["Authorization"] = `Bearer ${accesToken}`;
};

export const removeAuthHeader = () => {
  delete client.defaults.headers.common["Authorization"];
};
