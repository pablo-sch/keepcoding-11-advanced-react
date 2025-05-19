import PostsPage from "./pages/posts/posts-page";
import LoginPage from "./pages/auth/login-page";

import "./App.css";
import { useState } from "react";

interface AppProps {
  defaultIsLoggedIn: boolean;
}

function App({defaultIsLoggedIn}: AppProps) {
  // State to track whether the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(defaultIsLoggedIn);

  // Function to handle login logic by updating the login state
  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  // Conditionally render either the PostsPage or LoginPage based on login status
  return isLoggedIn ? <PostsPage onLogout={handleLogout} active/> : <LoginPage onLogin={handleLogin} />;
}

export default App;
