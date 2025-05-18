import axios from 'axios';

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const setAuthHeader = (accesToken: string) => {
  client.defaults.headers.common['Authorization'] = `Bearer ${accesToken}`;
}
 