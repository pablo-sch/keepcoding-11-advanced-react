import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import storage from "./utils/storage.ts";
import { setAuthHeader } from "./api/client.ts";
import AuthProvider from "./pages/auth/auth-provider.tsx";

import "./index.css";

const accessToken = storage.get("auth");
if (accessToken) {
  setAuthHeader(accessToken);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider defaultIsLoggedIn={!!accessToken}>
      <App/>
    </AuthProvider>
  </StrictMode>,
);
