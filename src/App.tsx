import PostsPage from "./pages/posts/posts-page";
import NewPostPage from "./pages/posts/new-post-page";
import LoginPage from "./pages/auth/login-page";
import { useAuth } from "./pages/auth/context";

function App() {
  const { isLogged } = useAuth();
  return isLogged ? (
    <>
      <PostsPage />
      <NewPostPage />
    </>
  ) : (
    <LoginPage />
  );
}

export default App;
