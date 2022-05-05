/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from "@testing-library/react";
import PublishButton from "../PublishButton";
import { PublishButtonProps } from "../PublishButton.types";
import { MockedProvider } from "@apollo/client/testing";

describe("PublishButton", () => {
  const defaultProps: PublishButtonProps = {
    postId: "testPostId",
  };

  const renderComponent = (args?: any) => {
    const props = { ...defaultProps, ...args };

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <PublishButton {...props} />
      </MockedProvider>
    );
  };

  test("should render button text", async () => {
    renderComponent();
    expect(screen.getByText("Publish")).toBeInTheDocument();
  });

  test("should trigger publish event handler without error", async () => {
    renderComponent();

    const button = screen.getByRole("button");

    fireEvent.click(button);
  });
});
