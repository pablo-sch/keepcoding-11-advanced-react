import { useState, type ChangeEvent, type FormEvent } from "react";
import { login } from "./service";

interface LoginPageProps {
  onLogin: () => void; // Function to call when login is successful
}

function LoginPage({ onLogin }: LoginPageProps) {
  /* 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  */

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { username, password } = credentials;
  const disableSubmit = username === "" || password === "";

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

    /* 
    console.log(event.target.username.value);
    console.log(event.target.password.value); 
    */

    try {
      /*    
      const form = event.currentTarget;
      const formData = new FormData(form);

      const username = formData.get("username") as string;
      const password = formData.get("password") as string;
      */

      await login(credentials);

      //console.log(response);

      //************************************************************************************* */
      // If successful, trigger the onLogin callback to update app state
      // and redirect the user to the posts page.
      //************************************************************************************* */

      onLogin();
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  /* 
  <input type="text" name="username" defaultValue="example-default-value"/>
  <input type="text" name="username" value="example-value"/>
  */

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
