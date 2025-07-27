import "./login-page.css";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Button from "../../components/ui/button";
import FormField from "../../components/ui/form-field";
import { useLocation, useNavigate } from "react-router";
// import { createPortal } from "react-dom";
// import copyStyles from "../../utils/copyStyles";
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
  // const firstTime = useRef(true);
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
    // console.log("Effect");
    // if (firstTime.current) {
    //   console.log("First time");
    //   firstTime.current = false;
    // }
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
      // Navigate to the page in state.from
      const to = location.state?.from ?? "/";
      navigate(to, { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="login-page">
      <h1 className="login-page-title">Log in to Twitter</h1>
      <form onSubmit={handleSubmit}>
        <FormField type="email" name="email" label="email" placeholder="e.g. user@example.com" value={email} onChange={handleChange} />
        <FormField type="password" name="password" label="password" value={password} onChange={handleChange} />
        <Button type="submit" disabled={isDisabled} className="login-form-submit">
          Log in
        </Button>
      </form>
      {error && (
        <div
          className="login-page-error"
          role="alert"
          onClick={() => {
            uiResetErrorAction();
          }}
        >
          {error.message}
        </div>
      )}
    </div>
  );
}

// function LoginPagePortal() {
//   const portalContainer = useRef<HTMLDivElement>(document.createElement("div"));

//   useEffect(() => {
//     portalContainer.current.className = "container";

//     const externalWindow = window.open("", "", "width=600, height=500");

//     if (externalWindow) {
//       externalWindow.document.body.appendChild(portalContainer.current);
//       copyStyles(window.document, externalWindow.document);
//     }

//     return () => {
//       if (externalWindow) {
//         externalWindow.close();
//       }
//     };
//   }, []);

//   return createPortal(<LoginPage />, portalContainer.current);
// }

export default LoginPage;
