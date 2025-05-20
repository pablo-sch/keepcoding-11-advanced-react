import PostsPage from "./pages/posts/posts-page";
import LoginPage from "./pages/auth/login-page";

import "./App.css";
import { useState } from "react";
import { AuthContext } from "./pages/auth/context";

interface AppProps {
  defaultIsLoggedIn: boolean;
}

function App({ defaultIsLoggedIn }: AppProps) {
  // State to track whether the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(defaultIsLoggedIn);

  // Function to handle login logic by updating the login state
  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  const authValue = {
    isloggedIn: isLoggedIn, 
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {isLoggedIn ? (
        <PostsPage active isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </AuthContext.Provider>
  );
}
export default App;
