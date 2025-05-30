import { Link, NavLink } from "react-router-dom";

import NodepopIcon from "../icons/nodepop-icon";

import AuthButton from "../../pages/auth/auth-button";
import "./header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="header-container">
          <Link to="/">
            <div className="header-logo">
              <NodepopIcon />
            </div>
          </Link>
          <nav className="header-nav">
            <NavLink to="/adverts/new">New Advert</NavLink>
            <NavLink to="/adverts" end>
              Latest Adverts
            </NavLink>
            <AuthButton />
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
