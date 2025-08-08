import type { Advert } from "../pages/advert/types";
import { mockTags } from "./mockTags";

export const mockedAdverts: Advert[] = [
  {
    id: "1",
    name: "Advert 1",
    price: 150,
    sale: true,
    tags: [mockTags[0], mockTags[1]],
    photo: "photo1.jpg",
    createdAt: "2023-04-01T12:00:00.000Z",
  },
  {
    id: "2",
    name: "Advert 2",
    price: 75,
    sale: false,
    tags: [mockTags[2], mockTags[3]],
    photo: "photo2.jpg",
    createdAt: "2023-04-02T15:30:00.000Z",
  },
];
