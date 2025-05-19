import PostsPage from "./pages/posts/posts-page";
import LoginPage from "./pages/auth/login-page";

import "./App.css";
import { useState } from "react";

function App() {
  // State to track whether the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login logic by updating the login state
  function handleLogin() {
    setIsLoggedIn(true);
  }

  // Conditionally render either the PostsPage or LoginPage based on login status
  return isLoggedIn ? <PostsPage /> : <LoginPage onLogin={handleLogin} />;
}

export default App;
