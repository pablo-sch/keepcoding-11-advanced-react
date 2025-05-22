import LoginPage from "./pages/auth/login-page";

import AdvertsPage from "./pages/advert/adverts-page";
import AdvertPage from "./pages/advert/advert-page";
import NewAdvertPage from "./pages/advert/new-advert-page";

import Layout from "./components/layout/layout";
import RequireAuth from "./pages/auth/require-auth";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/adverts" element={<Layout />}>
        <Route index element={<AdvertsPage />} />
        <Route path=":advertId" element={<AdvertPage />} />
        <Route
          path="new"
          element={
            <RequireAuth>
              <NewAdvertPage />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="/" element={<Navigate to="/adverts" />} />
      <Route path="/not-found" element={<div>404 | Not Found</div>} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}

export default App;
