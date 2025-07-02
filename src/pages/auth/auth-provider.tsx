import { useState, type ReactNode } from "react";
import { AuthContext } from "./context";
import storage from "../../utils/storage";
import { removeAuthorizationHeader } from "../../api/client";

interface AuthProviderProps {
  defaultIsLogged: boolean;
  children: ReactNode;
}

function AuthProvider({ defaultIsLogged, children }: AuthProviderProps) {
  const [isLogged, setIsLogged] = useState(defaultIsLogged);

  function handleLogin() {
    setIsLogged(true);
  }

  function handleLogout() {
    storage.remove("auth");
    removeAuthorizationHeader();
    setIsLogged(false);
  }

  const authValue = {
    isLogged,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
