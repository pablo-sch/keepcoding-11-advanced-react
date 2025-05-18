import "./posts-page.css";
import { getLatestPosts } from "./service";

import { useState, useEffect } from "react";
import type { Post } from "./types";

/* const posts = [
  {
    id: 1,
    title: "Post 1",
    content: "This is the content of post 1",
  },
  {
    id: 2,
    title: "Post 2",
    content: "This is the content of post 2",
  },
]; */

function postsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getLatestPosts().then((posts) => {
      setPosts(posts);
    });
  }, []);

  /* 
  useEffect(() => {
    async function getPosts() {
      const posts = await getLatestPosts();
      setPosts(posts);
    }
  });
  */

  return (
    <div className="posts-page">
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
      <button disabled={false}> Click Me</button>
    </div>
  );
}

export default postsPage;
