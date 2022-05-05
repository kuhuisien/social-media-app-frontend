/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from "@testing-library/react";
import UnpublishButton from "../UnpublishButton";
import { UnpublishButtonProps } from "../UnpublishButton.types";
import { MockedProvider } from "@apollo/client/testing";

describe("UnpublishButton", () => {
  const defaultProps: UnpublishButtonProps = {
    postId: "testPostId",
  };

  const renderComponent = (args?: any) => {
    const props = { ...defaultProps, ...args };

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <UnpublishButton {...props} />
      </MockedProvider>
    );
  };

  test("should render button text", async () => {
    renderComponent();
    expect(screen.getByText("Unpublish")).toBeInTheDocument();
  });

  test("should trigger publish event handler without error", async () => {
    renderComponent();

    const button = screen.getByRole("button");

    fireEvent.click(button);
  });
});
