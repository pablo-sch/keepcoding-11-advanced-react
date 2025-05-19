import "./posts-page.css";
import { getLatestPosts } from "./service";

import { useState, useEffect } from "react";
import type { Post } from "./types";

interface PostsPageProps {
  active: boolean;
  onLogout: () => void;
}

function postsPage({ onLogout }: PostsPageProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function getPosts() {
      const posts = await getLatestPosts();
      setPosts(posts);
    }
    getPosts();
  }, []);

  const hadleLogoutClick = async () => {
     await onLogout();
     onLogout();
  };

  return (
    <div className="posts-page">
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
      <button disabled={false} onClick={hadleLogoutClick}>
        Logout
      </button>
    </div>
  );
}

export default postsPage;
