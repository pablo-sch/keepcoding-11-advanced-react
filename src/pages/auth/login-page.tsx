import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";

import Button from "../../components/ui/button";
import FormField from "../../components/ui/form-field";

import { useLoginAction, useUiResetError } from "../../store/hooks";
import { useAppSelector } from "../../store";
import { getUi } from "../../store/selectors";

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const loginAction = useLoginAction();
  const uiResetErrorAction = useUiResetError();
  const { pending: isFetching, error } = useAppSelector(getUi);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      console.log("Timeout", timeoutRef.current);
    }, 20000);
    console.log("creating timeout", timeoutRef.current);

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, []);

  const { email, password } = credentials;
  const isDisabled = !email || !password || isFetching;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await loginAction(credentials);
      const to = location.state?.from ?? "/";
      navigate(to, { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">Log in to your account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField type="email" name="email" label="Email" placeholder="e.g. user@example.com" value={email} onChange={handleChange} id="email" />
          <FormField type="password" name="password" label="Password" placeholder="Your password" value={password} onChange={handleChange} id="password" />
          <Button type="submit" disabled={isDisabled} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200">
            {isFetching ? "Logging in..." : "Log In"}
          </Button>
        </form>
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded cursor-pointer text-sm text-center" role="alert" onClick={() => uiResetErrorAction()}>
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
