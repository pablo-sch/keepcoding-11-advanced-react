import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import configureStore from "./store";

import App from "./App";
import storage from "./utils/storage";
import { setAuthorizationHeader } from "./api/client";

import ErrorBoundary from "./components/error/error-boundary";
import "./styles/index.css";

const accessToken = storage.get("auth");

if (accessToken) {
  setAuthorizationHeader(accessToken);
}
const router = createBrowserRouter([{ path: "*", element: <App /> }]);
const store = configureStore({ auth: !!localStorage }, router);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
