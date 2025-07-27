import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

import App from "./App";
import storage from "./utils/storage";
import { setAuthorizationHeader } from "./api/client";

//import AuthProvider from "./pages/auth/auth-provider";

import ErrorBoundary from "./components/error/error-boundary";

import "./styles/index.css";
import { Provider } from "react-redux";
import configureStore from "./store";

/* let accessToken = storage.get("auth", "local");

if (!accessToken) {
  accessToken = storage.get("auth", "session");
} */

/* const defaultIsLogged = !!accessToken;

if (accessToken) {
  setAuthorizationHeader(accessToken);
} */
const accessToken = storage.get("auth");
if (accessToken) {
  setAuthorizationHeader(accessToken);
}
const store = configureStore({ auth: !!localStorage });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
