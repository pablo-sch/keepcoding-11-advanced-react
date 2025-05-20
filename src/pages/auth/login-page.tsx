import { useState, type ChangeEvent, type FormEvent } from "react";
import { login } from "./service";
import { useAuth } from "./context";

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
  const disableSubmit = username === "" || password === "";

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
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
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
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <button type="submit" disabled={disableSubmit}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
