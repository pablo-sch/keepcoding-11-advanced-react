import { createContext, useContext } from "react";

export const AuthContext = createContext({
  isLogged: false,
  onLogin: (_remember: boolean) => {},
  onLogout: () => {},
});

export function useAuth() {
  const authValue = useContext(AuthContext);
  return authValue;
}
