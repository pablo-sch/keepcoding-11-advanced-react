import { useRef, useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { AxiosError } from "axios";

import { login } from "./service";
import { useAuth } from "./context";

import Button from "../../components/ui/button";
import FormField from "../../components/ui/form-field";

// import { emailRegex } from "../../utils/validation";

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { onLogin, isLogged } = useAuth();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [remember, setRemember] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);

  if (isLogged) {
    return <Navigate to="/" replace />;
  }

  const handleInput = () => {
    const email = emailRef.current?.value.trim() ?? "";
    const password = passwordRef.current?.value.trim() ?? "";
    setCanSubmit(email !== "" && password !== "");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = emailRef.current?.value.trim() ?? "";
    const password = passwordRef.current?.value.trim() ?? "";

    if (!email || !password) return;

    try {
      setIsFetching(true);

      await login({ email, password }, remember);

      onLogin();

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
        <FormField
          id="email"
          name="email"
          label="Email address"
          type="email"
          placeholder="e.g. user@example.com"
          maxLength={35}
          ref={emailRef}
          onInput={handleInput}
          required
          // pattern={emailRegex.source}
        />
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
