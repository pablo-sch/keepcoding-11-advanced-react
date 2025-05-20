import { createContext, useContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  onLogin: () => {},
  onLogout: () => {},
});


//Custome Hook
// This is a custom hook that allows you to use the AuthContext in your components
export function useAuth() {
  const authValue = useContext(AuthContext);
  return authValue;
}
