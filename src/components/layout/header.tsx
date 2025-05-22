import AuthButton from "../../pages/auth/auth-button";
import { Link, NavLink } from "react-router-dom";
import NodepopIcon from "../icons/nodepop-icon";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <div className="header-logo">
          <NodepopIcon width={32} height={32} />
        </div>
      </Link>
      <nav className="header-nav">
        <NavLink to="/adverts/new">Nuevo Anuncio</NavLink>
        <NavLink to="/adverts" end>
          Anuncios Recientes
        </NavLink>
        <AuthButton />
      </nav>
    </header>
  );
}

export default Header;
