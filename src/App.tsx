import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const LoginPage = lazy(() => import("./pages/auth/login-page"));
const RequireAuth = lazy(() => import("./pages/auth/require-auth"));

const AdvertsPage = lazy(() => import("./pages/advert/adverts-page"));
const AdvertPage = lazy(() => import("./pages/advert/advert-page"));
const NewAdvertPage = lazy(() => import("./pages/advert/new-advert-page"));

const Layout = lazy(() => import("./components/layout/layout"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
}

export default App;
