import "./posts-page.css";
import { getLatestPosts } from "./service";

import { useState, useEffect } from "react";
import type { Post } from "./types";
import Layout from "../../components/layout/layout";
import defaultProfileImage from "../../assets/default-profile.png";

function postsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function getPosts() {
      const posts = await getLatestPosts();
      setPosts(posts);
    }
    getPosts();
  }, []);

  return (
    <Layout title="Nice Title">
      <img src={defaultProfileImage} alt="Default profile" />
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
