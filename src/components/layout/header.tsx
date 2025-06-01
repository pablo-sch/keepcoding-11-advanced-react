import { Link, NavLink } from "react-router-dom";

import NodepopIcon from "../icons/nodepop-icon";

import AuthButton from "../../pages/auth/auth-button";
import "./header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-wrapper">
        <nav className="header-nav">
          <div className="header-left">
            <div className="header-logo">
              <Link to="/">
                <NodepopIcon />
              </Link>
            </div>

            <div className="header-nav-links">
              <NavLink className="nav-link" to="/adverts/new">
                New Advert
              </NavLink>
              <NavLink className="nav-link" to="/adverts" end>
                Adverts List
              </NavLink>
            </div>
          </div>
          <div className="header-right">
            <AuthButton />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
