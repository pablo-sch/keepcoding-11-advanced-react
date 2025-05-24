import { client } from "../../api/client";
import type { Advert } from "./types";

const ADVERTS_URL = "/api/adverts";

export const getAdverts = async (): Promise<Advert[]> => {
  const response = await client.get<Advert[]>(ADVERTS_URL);
  return response.data;
};

export const getAdvert = async (id: string): Promise<Advert> => {
  const response = await client.get<Advert>(`${ADVERTS_URL}/${id}`);
  return response.data;
};

export const createAdvert = async (advert: Omit<Advert, "id">): Promise<Advert> => {
  const response = await client.post<Advert>("/api/adverts", advert);
  return response.data;
};
