/* interface User {
  name: string;
  username: string;
} */

export interface Advert {
  id: number;
  name: string;
  price: number;
  sale: boolean;
  tags: string[];
  photo?: string;
  createdAt: string;
  //user: User;
  //updatedAt: string;
}
