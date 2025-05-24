import { useRef, useState, type FormEvent } from "react";
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

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [canSubmit, setCanSubmit] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);

  const handleInput = () => {
    const username = usernameRef.current?.value.trim() ?? "";
    const password = passwordRef.current?.value.trim() ?? "";
    setCanSubmit(username !== "" && password !== "");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = usernameRef.current?.value.trim() ?? "";
    const password = passwordRef.current?.value.trim() ?? "";
    if (!username || !password) return;

    try {
      setIsFetching(true);
      await login({ username, password });
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
        <FormField id="username" name="username" label="Nombre de usuario" type="text" ref={usernameRef} onInput={handleInput} />
        <FormField id="password" name="password" label="Contraseña" type="password" ref={passwordRef} onInput={handleInput} />
        <Button type="submit" variant="primary" className="login-form-submit" disabled={!canSubmit || isFetching}>
          Entrar
        </Button>
      </form>
      {error && (
        <div className="login-page-error" role="alert" onClick={() => setError(null)}>
          {error.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
