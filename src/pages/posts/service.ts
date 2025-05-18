import { client } from "../../api/client";
import type { Post } from "./types";

const POSTS_URL = '/api/posts';

export const getLatestPosts = async () => {
  const posts = await client.get<Post[]>(POSTS_URL);
  return posts.data;
};
