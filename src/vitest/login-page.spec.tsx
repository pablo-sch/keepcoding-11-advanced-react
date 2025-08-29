//NATIVE
import LoginPage from "./../pages/auth/login-page";

//DEPENDENCIES
import { Provider } from "react-redux";

import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

//REACT-REDUX FILES
import type { RootState } from "../store";

const mockLoginAction = vi.fn();
const mockUiResetErrorAction = vi.fn();

vi.mock("../store/hooks", () => ({
  useLoginAction: () => mockLoginAction,
  useUiResetError: () => mockUiResetErrorAction,
}));

vi.mock("../store", () => ({
  useAppSelector: vi.fn(),
}));

import { useAppSelector } from "../store";

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLoginAction.mockResolvedValue(undefined);
  });

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
    const testState = {
      ...state,
      ui: {
        ...state.ui,
        error: error || null,
      },
    };

    vi.mocked(useAppSelector).mockImplementation((selector) => selector(testState));

    return render(
      <Provider
        store={{
          getState: () => testState,
          //@ts-expect-error: mock store
          subscribe: () => {},
          //@ts-expect-error: mock store
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

    await userEvent.type(emailInput, "example@gmail.com");
    await userEvent.type(passwordInput, "1234");

    expect(button).toBeEnabled();

    await userEvent.click(button);

    expect(mockLoginAction).toHaveBeenCalledWith({
      email: "example@gmail.com",
      password: "1234",
    });
  });

  test("should render error", async () => {
    const error = new Error("Wrong gmail/password");
    const { container } = renderComponent(error);
    expect(container).toMatchSnapshot();

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("⚠️ Wrong gmail/password");

    await userEvent.click(alert);

    expect(mockUiResetErrorAction).toHaveBeenCalled();
  });
});
