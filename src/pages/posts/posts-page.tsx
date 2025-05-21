import { useState, useEffect } from "react";

import { getLatestPosts } from "./service";
import type { Post } from "./types";
import Layout from "../../components/layout/layout";

import Button from "../../components/ui/button";
import PostItem from "./post-item";
import "./posts-page.css";


const EmptyList = () => (
  <div className="posts-page-empty">
    <p>Be the first one!</p>
    <Button $variant="primary">Create post</Button>
  </div>
);

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
      <div className="posts-page">
        {posts.length ? (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <PostItem post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </div>
    </Layout>
  );
}

export default postsPage;
