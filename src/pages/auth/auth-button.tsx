import Button from "../../components/ui/button";
import { useAuth } from "../../pages/auth/context";
import { logout } from "../../pages/auth/service";

export default function AuthButton() {
  const { isLoggedIn, onLogout } = useAuth();
  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };
  return isLoggedIn ? (
    <Button onClick={handleLogoutClick} $variant="secondary">
      Logout
    </Button>
  ) : (
    <Button $variant="primary">Login</Button>
  );
}