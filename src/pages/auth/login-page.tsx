import type { FormEvent } from "react";
import { login } from "./service";

interface LoginPageProps {
  onLogin: () => void;
}

function LoginPage({ onLogin }: LoginPageProps) {
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    /* console.log(event.target.username.value);
    console.log(event.target.password.value); */

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);

      const username = formData.get("username") as string;
      const password = formData.get("password") as string;

      await login({ username, password });

      //console.log(response);

      onLogin();
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
