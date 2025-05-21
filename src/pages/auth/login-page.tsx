import { useState, type ChangeEvent, type FormEvent } from "react";
import { login } from "./service";
import { useAuth } from "./context";

import Button from "../../components/ui/button";
import FormField from "../../components/ui/form-field";

import "./login-page.css";

/* // Function to call when login is successful
interface LoginPageProps {
  onLogin: () => void; 
} */

function LoginPage(/* { onLogin }: LoginPageProps */) {
  const { onLogin } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { username, password } = credentials;
  const isDisabled = !username || !password;

  //************************************************************************************* */
  // Handles changes in input fields (e.g., username, password)
  // Extracts the input's name and value, and updates the corresponding state
  // Ensures the credentials state remains up-to-date with user input
  //*************************************************************************************
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  }

  //************************************************************************************* */
  // Asynchronous function that handles the form submission event for the login form.
  // It receives a FormEvent specific to an HTMLFormElement to provide type safety.
  //************************************************************************************* */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await login(credentials);

      //************************************************************************************* */
      // If successful, trigger the onLogin callback to update app state
      // and redirect the user to the posts page.
      //************************************************************************************* */
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
