import PostsPage from "./pages/posts/posts-page";
import LoginPage from "./pages/auth/login-page";

import "./App.css";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

function handleLogin() { 
    setIsLoggedIn(true);
  }

  return isLoggedIn ? <PostsPage /> : <LoginPage onLogin= {handleLogin}/>;

  //return ;
}

export default App;
