import PostsPage from "./pages/posts/posts-page";
import LoginPage from "./pages/auth/login-page";
import { useAuth } from "./pages/auth/context";

import "./App.css";

function App() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <PostsPage /* active */ /> : <LoginPage />;
}
export default App;
