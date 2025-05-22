import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Button from "../../components/ui/button";
import { login } from "./service";
import { useAuth } from "./context";
import FormField from "../../components/ui/form-field";
import { useLocation, useNavigate } from "react-router";
import { AxiosError } from "axios";

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { onLogin } = useAuth();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState<{ message: string } | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      console.log("Timeout", timeoutRef.current);
    }, 20000);

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, []);

  const { username, password } = credentials;
  const isDisabled = !username || !password || isFetching;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }

      setIsFetching(true);
      await login(credentials);
      onLogin();

      const to = location.state?.from ?? "/";
      navigate(to, { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        setError({
          message: error.response?.data?.message ?? error.message ?? "Error al iniciar sesión",
        });
      }
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="login-page">
      <h1 className="login-page-title">Inicia sesión</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="username"
          label="Nombre de usuario"
          value={username}
          onChange={handleChange}
        />
        <FormField
          type="password"
          name="password"
          label="Contraseña"
          value={password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={isDisabled}
          className="login-form-submit"
        >
          Entrar
        </Button>
      </form>
      {error && (
        <div
          className="login-page-error"
          role="alert"
          onClick={() => setError(null)}
        >
          {error.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;