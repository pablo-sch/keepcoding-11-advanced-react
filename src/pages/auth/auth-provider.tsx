import { useState, type ReactNode } from "react";
import { AuthContext } from "./context";
import storage from "../../utils/storage";

interface AuthProviderProps {
  defaultIsLogged: boolean;
  children: ReactNode;
}

function AuthProvider({ defaultIsLogged, children }: AuthProviderProps) {
  const [isLogged, setIsLogged] = useState(defaultIsLogged);

  function handleLogin(remember: boolean) {
    setIsLogged(true);

    if (remember) {
      storage.set("auth", "true");
      storage.set("remember", "true");
    } else {
      storage.remove("auth");
      storage.remove("remember");
    }
  }

  function handleLogout() {
    setIsLogged(false);
    storage.remove("auth");
    storage.remove("remember");
  }

  const authValue = {
    isLogged,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
