//DEPENDENCIES
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";

//REACT
import Button from "../../components/ui/button";
import FormField from "../../components/ui/form-field";
import Form from "../../components/ui/form"; // <-- aquí importas tu Form

//REDUX
import { useLoginAction, useUiResetError } from "../../store/hooks";
import { useAppSelector } from "../../store";
import { getUi } from "../../store/selectors";

function LoginPage() {
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
    await loginAction(credentials);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 bg-gray-300">
      <Form onSubmit={handleSubmit} layout="normal">
        <h1 className="text-2xl font-bold text-center text-gray-800">Log in to your account</h1>
        <FormField
          type="email"
          name="email"
          label="Email"
          placeholder="e.g. user@example.com"
          value={email}
          onChange={handleChange}
          id="email"
        />
        <FormField
          type="password"
          name="password"
          label="Password"
          placeholder="Your password"
          value={password}
          onChange={handleChange}
          id="password"
        />
        <Button type="submit" disabled={isDisabled}>
          {isFetching ? "Logging in..." : "Log In"}
        </Button>
        {error && (
          <div
            className="mt-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded cursor-pointer text-sm text-center"
            role="alert"
            onClick={() => uiResetErrorAction()}
          >
            {error.message}
          </div>
        )}
      </Form>
    </div>
  );
}

export default LoginPage;
