//DEPENDENCIES
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const LoginPage = lazy(() => import("./pages/auth/login-page"));
const RequireAuth = lazy(() => import("./pages/auth/require-auth"));

const AdvertsPage = lazy(() => import("./pages/advert/adverts-page"));
const AdvertPage = lazy(() => import("./pages/advert/advert-page"));
const NewAdvertPage = lazy(() => import("./pages/advert/new-advert-page"));

const NotFoundPage = lazy(() => import("./pages/HTTP-status-code/not-found"));
const InternalServerError = lazy(() => import("./pages/HTTP-status-code/internal-server-error"));

const Layout = lazy(() => import("./components/layout/layout"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/adverts"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route index element={<AdvertsPage />} />
          <Route path=":advertId" element={<AdvertPage />} />
          <Route path="new" element={<NewAdvertPage />} />
        </Route>
        <Route path="/" element={<Navigate to="/adverts" />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
        <Route path="/internal-server-error" element={<InternalServerError />} />
      </Routes>
    </Suspense>
  );
}

export default App;
