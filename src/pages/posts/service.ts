import { client } from "../../api/client";
import type { Post } from "./types";

const POSTS_URL = "/api/posts";

export const getLatestPosts = async () => {
  const url = `${POSTS_URL}?_expand=user&_embed=likes&_sort=updatedAt&_order=desc`;
  const response = await client.get<Post[]>(url);
  return response.data;
};
