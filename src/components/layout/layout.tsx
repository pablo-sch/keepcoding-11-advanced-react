import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
