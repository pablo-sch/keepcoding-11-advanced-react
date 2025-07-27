import Button from "../../components/ui/button";
import { logout } from "../../pages/auth/service";
import { useAuth, useLogoutAction } from "../../store/hooks";

type AuthButtonProps = {
  className?: string;
};

export default function AuthButton({ className }: AuthButtonProps) {
  const isLogged = useAuth();
  const logoutAction = useLogoutAction();

  const handleLogoutClick = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;

    await logout();
    logoutAction();
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
