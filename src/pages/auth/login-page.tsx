import { useState, type ChangeEvent, type FormEvent } from "react";
import { login } from "./service";
import { useAuth } from "./context";

import Button from "../../components/ui/button";
import FormField from "../../components/ui/form-field";


function LoginPage() {
  const { onLogin } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { username, password } = credentials;
  const isDisabled = !username || !password;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await login(credentials);
      onLogin();
    } catch (error) {
      console.error("Login failed", error);
    }
  }
  return (
    <div className="login-page">
      <h1 className="login-page-title">Login Page</h1>

      <form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="username"
          label="phone, email or username"
          value={username}
          onChange={handleChange}
        />
        <FormField
          type="password"
          name="password"
          label="password"
          value={password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          $variant="primary"
          disabled={isDisabled}
          className="login-form-submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;