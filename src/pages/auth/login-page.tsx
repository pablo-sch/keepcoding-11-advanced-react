import { useRef, useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { AxiosError } from "axios";

import { login } from "./service";
import { useAuth } from "./context";

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailRef.current?.value.trim() ?? "";
    const password = passwordRef.current?.value.trim() ?? "";

    if (!email || !password) return;

    try {
      setIsFetching(true);

      await login({ email, password }, remember);

      onLogin();

      const to = (location.state as { from?: string })?.from ?? "/";
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
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login Page</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input id="email" name="email" type="email" placeholder="e.g. user@example.com" maxLength={35} ref={emailRef} onInput={handleInput} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input id="password" name="password" type="password" maxLength={25} ref={passwordRef} onInput={handleInput} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div className="flex items-center">
            <input id="remember" type="checkbox" checked={remember} onChange={() => setRemember(!remember)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <button type="submit" disabled={!canSubmit || isFetching} className={`w-full py-2 px-4 rounded-md text-white font-semibold ${!canSubmit || isFetching ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}>
            Log in
          </button>
        </form>

        {error && (
          <div role="alert" onClick={() => setError(null)} className="mt-4 p-3 bg-red-100 text-red-700 rounded cursor-pointer text-center">
            {error.message}
          </div>
        )}
      </div>
    </main>
  );
}

export default LoginPage;
