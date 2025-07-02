const GET_ADVERTS = import.meta.env.VITE_GET_ADVERTS;
const GET_TAGS = import.meta.env.VITE_GET_TAGS;

import { client } from "../../api/client";
import type { Advert } from "./types";

/* const getAuth = () => {
  const auth = localStorage.getItem("auth");
  return auth;
}; */

export const getTags = async (): Promise<string[]> => {
  const response = await client.get<string[]>(GET_TAGS);
  return response.data;
};

export const getAdverts = async (): Promise<Advert[]> => {
  const response = await client.get<Advert[]>(GET_ADVERTS, {
    /*     headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getAuth()}`,
    }, */
  });
  return response.data;
};

export const getAdvert = async (id: string): Promise<Advert> => {
  const response = await client.get<Advert>(`${GET_ADVERTS}/${id}`, {
    /*     headers: {
      "Content-Type": "multipart/form-data",
       Authorization: `Bearer ${getAuth()}`, 
    }, */
  });
  return response.data;
};

export const createAdvert = async (formData: FormData): Promise<Advert> => {
  const response = await client.post<Advert>(GET_ADVERTS, formData, {
    /*     headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getAuth()}`,
    }, */
  });

  return response.data;
};

export const deleteAdvert = async (id: string): Promise<void> => {
  const response = await client.delete(`${GET_ADVERTS}/${id}`, {
    /*     headers: {
      Authorization: `Bearer ${getAuth()}`,
    }, */
  });
  return response.data;
};

export const getFilteredAdverts = async (params: Record<string, string | number | undefined>): Promise<Advert[]> => {
  const response = await client.get<Advert[]>(GET_ADVERTS, {
    params,
    /*     headers: {
      Authorization: `Bearer ${getAuth()}`,
    }, */
  });
  return response.data;
};
