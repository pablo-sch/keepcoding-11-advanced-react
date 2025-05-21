/* import { useAuth } from "../../pages/auth/context";
import { logout } from "../../pages/auth/service";
import Button from "../button"; */
/* import logo from "../../assets/nodepop-react-icon.svg";*/

import AuthButton from "../../pages/auth/auth-button";
import NodePopIcon from "../icons/nodepop-icon";
import "./header.css";

function Header() {
  /*   const { isLoggedIn, onLogout } = useAuth();
  const hadleLogoutClick = async () => {
    await logout();
    onLogout();
  }; */

  return (
    <header className="header">
      <div className="header-logo">
        <NodePopIcon width={32} height={32} />
      </div>

      {/*
        <nav>
        {isLoggedIn ? (
          <Button $variant="secondary" onClick={hadleLogoutClick}>
            Logout
          </Button>
        ) : (
          <Button $variant="primary">Login</Button>
        )} 
        */}
      <nav className="header-nav">
        <AuthButton />
      </nav>
    </header>
  );
}

export default Header;
