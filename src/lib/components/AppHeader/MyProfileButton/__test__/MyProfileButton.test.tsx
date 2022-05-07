/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import MyProfileButton, { GET_MY_PROFILE } from "../MyProfileButton";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

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

describe("MyProfileButton", () => {
  const renderComponent = (
    mocks: readonly MockedResponse<Record<string, any>>[]
  ) => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MyProfileButton />
        </MockedProvider>
      </MemoryRouter>
    );
  };

  test("should render 'My profile' button", async () => {
    renderComponent([]);
    expect(screen.getByText("My profile")).toBeInTheDocument();
  });

  test("should trigger click handler for 'My profile' button without error", async () => {
    renderComponent([]);

    const button = screen.getByText("My profile");
    userEvent.click(button);
  });

  test("should trigger click handler for 'My profile' button without error", async () => {
    renderComponent(mocks);

    const button = screen.getByText("My profile");
    userEvent.click(button);
  });
});
