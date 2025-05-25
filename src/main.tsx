import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import storage from "./utils/storage";
import { setAuthorizationHeader } from "./api/client";
import AuthProvider from "./pages/auth/auth-provider";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/error/error-boundary";

const accessToken = storage.get("auth");
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider defaultIsLogged={!!accessToken}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
);
