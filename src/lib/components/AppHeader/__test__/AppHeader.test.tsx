import { render, screen } from "@testing-library/react";
import AppHeader from "../AppHeader";
import React, { Context } from "react";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => {
    return { pathName: "/" };
  },
}));

describe("AppHeader", () => {
  let realUseContext: <T>(context: Context<T>) => T;
  let useContextMock: jest.Mock;

  // Setup mock
  beforeEach(() => {
    realUseContext = React.useContext;
    useContextMock = React.useContext = jest.fn();
  });
  // Cleanup mock
  afterEach(() => {
    React.useContext = realUseContext;
  });

  const renderComponent = () => {
    useContextMock.mockReturnValue({ isSignedIn: false });

    render(<AppHeader />);
  };

  test("should render Sign in button when user is not signed in", async () => {
    renderComponent();
    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });

  test("should render Sign up button when user is not signed in", async () => {
    renderComponent();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  test("should render Log out button when user is signed in", async () => {
    useContextMock.mockReturnValue({ isSignedIn: true });
    render(<AppHeader />);

    expect(screen.getByText("Log out")).toBeInTheDocument();
  });

  test("should render My profile button when user is signed in", async () => {
    useContextMock.mockReturnValue({ isSignedIn: true });
    render(<AppHeader />);

    expect(screen.getByText("My profile")).toBeInTheDocument();
  });
});
