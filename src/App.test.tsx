import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

describe("ErrorDisplay", () => {
  test("renders header with signin and signup buttons when it is not signin or signup page", () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/", search: "?value=teresa_teng" }]}
      >
        <App />
      </MemoryRouter>
    );

    const signinButton = screen.getByText("Sign in");
    expect(signinButton).toBeInTheDocument();

    const signupButton = screen.getByText("Sign up");
    expect(signupButton).toBeInTheDocument();
  });

  test("not render header with signin and signup buttons when it is signin page", () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/signin", search: "?value=teresa_teng" }]}
      >
        <App />
      </MemoryRouter>
    );

    const signinButton = screen.queryByText("Sign in");
    expect(signinButton).not.toBeInTheDocument();

    const signupButton = screen.queryByText("Sign up");
    expect(signupButton).not.toBeInTheDocument();
  });

  test("not render header with signin and signup buttons when it is signup page", () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/signup", search: "?value=teresa_teng" }]}
      >
        <App />
      </MemoryRouter>
    );

    const signinButton = screen.queryByText("Sign in");
    expect(signinButton).not.toBeInTheDocument();

    const signupButton = screen.queryByText("Sign up");
    expect(signupButton).not.toBeInTheDocument();
  });
});
