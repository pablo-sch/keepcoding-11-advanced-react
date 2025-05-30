import { Outlet } from "react-router-dom";

import Footer from "./footer";
import Header from "./header";

import "./layout.css";

function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
