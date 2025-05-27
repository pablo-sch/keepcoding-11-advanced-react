const GET_ADVERTS = import.meta.env.VITE_GET_ADVERTS;
const GET_TAGS = import.meta.env.VITE_GET_TAGS;

import { client } from "../../api/client";
import type { Advert } from "./types";

export const getTags = async (): Promise<string[]> => {
  const response = await client.get<string[]>(GET_TAGS);
  return response.data;
};

export const getAdverts = async (): Promise<Advert[]> => {
  const response = await client.get<Advert[]>(GET_ADVERTS);
  return response.data;
};

export const getAdvert = async (id: string): Promise<Advert> => {
  const response = await client.get<Advert>(`${GET_ADVERTS}/${id}`);
  return response.data;
};

export const createAdvert = async (formData: FormData): Promise<Advert> => {
  const token = localStorage.getItem("auth");

  const response = await client.post<Advert>(GET_ADVERTS, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
