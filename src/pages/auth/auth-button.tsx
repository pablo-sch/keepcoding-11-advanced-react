import Button from "../../components/ui/button";
import { useAuth } from "../../pages/auth/context";
import { logout } from "../../pages/auth/service";

type AuthButtonProps = {
  className?: string;
};

export default function AuthButton({ className }: AuthButtonProps) {
  const { isLogged, onLogout } = useAuth();

  const handleLogoutClick = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;

    await logout();
    onLogout();
  };

  return isLogged ? (
    <Button className={className} onClick={handleLogoutClick}>
      Logout
    </Button>
  ) : (
    <Button to="/login" className={className}>
      Login
    </Button>
  );
}
