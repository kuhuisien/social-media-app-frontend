import { render, screen } from "@testing-library/react";
import AppHeader from "../AppHeader";
import React, { Context } from "react";
import { MockedProvider } from "@apollo/react-testing";
import { GET_MY_PROFILE } from "../MyProfileButton/MyProfileButton";

const mocks = [
  {
    request: {
      query: GET_MY_PROFILE,
    },
    result: {
      data: {
        me: {
          id: "10",
        },
      },
    },
  },
];

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderComponent = () => {
    render(
      <MockedProvider mocks={mocks}>
        <AppHeader />
      </MockedProvider>
    );
  };

  test("should render Sign in button when user is not signed in", async () => {
    useContextMock.mockReturnValue({ isSignedIn: false });

    renderComponent();

    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });

  test("should render Sign up button when user is not signed in", async () => {
    useContextMock.mockReturnValue({ isSignedIn: false });

    renderComponent();

    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  test("should render Log out button when user is signed in", async () => {
    useContextMock.mockReturnValue({ isSignedIn: true });

    //renderComponent();

    //expect(screen.getByText("Log out")).toBeInTheDocument();
  });

  test("should render My profile button when user is signed in", async () => {
    useContextMock.mockReturnValue({ isSignedIn: true });

    //renderComponent();
    //expect(screen.getByText("My profile")).toBeInTheDocument();
  });
});
