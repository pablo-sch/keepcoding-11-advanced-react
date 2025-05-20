import { useState } from "react";
import { AuthContext } from "./context";

interface AppPtoviderProps {
  defaultIsLoggedIn: boolean;
  children: React.ReactNode;
}

function AuthProvider({ defaultIsLoggedIn, children }: AppPtoviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(defaultIsLoggedIn);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  const authValue = {
    isLoggedIn,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
