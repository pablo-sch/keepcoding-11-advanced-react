import { render, screen } from "@testing-library/react";
import LoginPage from "./../pages/auth/login-page";
import { Provider } from "react-redux";
import { authLogin, uiResetError } from "../store/actions";
import userEvent from "@testing-library/user-event";
import type { RootState } from "../store";

vitest.mock("../store/actions");

describe("LoginPage", () => {
  const state: RootState = {
    auth: false,
    adverts: {
      loaded: false,
      data: [],
    },
    tags: [],
    ui: {
      pending: false,
      error: null,
    },
  };
  const renderComponent = (error?: Error) => {
    if (error) {
      state.ui.error = error;
    }
    return render(
      <Provider
        store={{
          getState: () => state,
          //@ts-expect-error: subscribe
          subscribe: () => {},
          //@ts-expect-error: dispatch
          dispatch: () => {},
        }}
      >
        <LoginPage />
      </Provider>
    );
  };

  test("should render", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test("should dispatch login action on submit", async () => {
    renderComponent();

    const emailInput = screen.getByLabelText(/Email/);
    const passwordInput = screen.getByLabelText(/Password/);
    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Log In");
    expect(button).toBeDisabled();

    //fireEvent.change(emailInput, { target: { value: "example@gmail.com" } });
    await userEvent.type(emailInput, "example@gmail.com");

    //fireEvent.change(passwordInput, { target: { value: "1234" } });
    await userEvent.type(passwordInput, "1234");

    expect(button).toBeEnabled();

    //fireEvent.click(button);
    await userEvent.click(button);

    expect(authLogin).toHaveBeenCalledWith({ email: "example@gmail.com", password: "1234" });
  });

  test("should render error", async () => {
    const error = new Error("Wrong gmail/password");
    const { container } = renderComponent(error);
    expect(container).toMatchSnapshot();

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent(error.message);

    await userEvent.click(alert);

    expect(uiResetError).toHaveBeenCalled();
  });
});
