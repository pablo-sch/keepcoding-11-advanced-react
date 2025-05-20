import { useAuth } from "../../pages/auth/context";
import { logout } from "../../pages/auth/service";
import Button from "../button";
/* import logo from "../../assets/nodepop-react-icon.svg";*/
import NodePopIcon from "../icons/nodepop";

function Header() {
  const { isLoggedIn, onLogout } = useAuth();
  const hadleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return (
    <header>
      <div>
        {/* <img src={logo} alt="Logo Web" /> */}
        <NodePopIcon width={32} height={32}/>
      </div>
      <nav>
        {isLoggedIn ? (
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
