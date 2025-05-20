import { useContext } from "react";
import { logout } from "../../pages/auth/service";
import Button from "../button";
import { AuthContext } from "../../pages/auth/context";

function Header() {
  const { isloggedIn, onLogout } = useContext(AuthContext);
  const hadleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return (
    <header>
      <div></div>
      <nav>
        {isloggedIn ? (
          <Button $variant="secondary" onClick={hadleLogoutClick}>
            Logout
          </Button>
        ) : (
          <Button $variant="primary">Login</Button>
        )}
      </nav>
    </header>
  );
}

export default Header;
