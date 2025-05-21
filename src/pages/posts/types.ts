interface User {
  name: string;
  username: string;
}

export interface Post {
  id: number;
  userId: number;
  content: string;
  updatedAt: string;
  user: User;
  likes: unknown[];
}