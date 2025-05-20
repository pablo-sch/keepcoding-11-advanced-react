import "./posts-page.css";
import { getLatestPosts } from "./service";

import { useState, useEffect } from "react";
import type { Post } from "./types";
import Layout from "../../components/layout/layout";

interface PostsPageProps {
  active: boolean;
  isLoggedIn: boolean;
  onLogout: () => void;
}

function postsPage({ isLoggedIn, onLogout }: PostsPageProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function getPosts() {
      const posts = await getLatestPosts();
      setPosts(posts);
    }
    getPosts();
  }, []);

  /*   const hadleLogoutClick = async () => {
    await onLogout();
    onLogout();
  }; */

  return (
    <Layout title="Nice Title" isLoggedIn={isLoggedIn} onLogout={onLogout}>
      <div className="posts-page">
        <h1>Posts</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.content}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default postsPage;
