import { useRef, useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";

import { AxiosError } from "axios";

import { login } from "./service";
import { useAuth } from "./context";

import Button from "../../components/ui/button";
import FormField from "../../components/ui/form-field";

//import { emailRegex } from "../../utils/validation";

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { onLogin, isLogged } = useAuth();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [remember, setRemember] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);

  if (isLogged) {
    return <Navigate to="/" replace />;
  }

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

      if (remember) {
        localStorage.setItem("auth", "true");
        localStorage.setItem("remember", "true");
      } else {
        localStorage.removeItem("auth");
        localStorage.removeItem("remember");
      }

      onLogin(remember);

      const to = location.state?.from ?? "/";
      navigate(to, { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        setError({
          message: error.response?.data?.message ?? error.message ?? "Error while logging in",
        });
      }
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="login-page">
      <h1 className="login-page-title">Sign in</h1>
      <form onSubmit={handleSubmit}>
        <FormField id="gmail" name="gmail" label="Gmail address" type="email" placeholder="e.g. user@example.com" maxLength={35} ref={usernameRef} onInput={handleInput} required /* pattern={emailRegex.source} */ />
        <FormField id="password" name="password" label="Password" type="password" maxLength={25} ref={passwordRef} onInput={handleInput} />
        <Button type="submit" variant="primary" className="login-form-submit" disabled={!canSubmit || isFetching}>
          Log in
        </Button>
        <label>
          <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)} />
          Remember me
        </label>
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
