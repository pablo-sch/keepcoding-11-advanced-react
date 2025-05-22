import { client } from "../../api/client";
import type { Advert } from "./types";

const ADVERTS_URL = "/api/v1/adverts"; // o '/api/v1/adverts' si usas nodepop-api

export const getAdverts = async (): Promise<Advert[]> => {
  const response = await client.get<{ results: Advert[] }>(ADVERTS_URL);
  return response.data.results;
};

export const getAdvert = async (id: string): Promise<Advert> => {
  const response = await client.get<Advert>(`${ADVERTS_URL}/${id}`);
  return response.data;
};

export const createAdvert = async (formData: FormData): Promise<Advert> => {
  const response = await client.post<Advert>(ADVERTS_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
