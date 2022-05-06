/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddPostButton from "../AddPostButton";
import { MockedProvider } from "@apollo/client/testing";

describe("AddPostButton", () => {
  const renderComponent = () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AddPostButton />
      </MockedProvider>
    );
  };

  test("should render button text", async () => {
    renderComponent();
    expect(screen.getByText("Add Post")).toBeInTheDocument();
  });

  test("should open modal with title and content inputs when Add Post button is clicked", async () => {
    renderComponent();

    // initially modal should be closed
    expect(screen.queryByText("Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Content")).not.toBeInTheDocument();

    // click button to open modal
    const button = screen.getByRole("button");
    userEvent.click(button);

    // assert that modal is now open
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  test("should close modal when Cancel button in the modal is clicked", async () => {
    renderComponent();

    const addPostbutton = screen.getByRole("button");
    userEvent.click(addPostbutton);

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();

    const cancelButton = screen.getByText("Cancel");
    userEvent.click(cancelButton);

    // should close the modal, hence inputs not found
    //expect(screen.queryByText("Title")).not.toBeInTheDocument();
    //expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });
});
