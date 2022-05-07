/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import ApolloProviderWrapper from "../ApolloProviderWrapper";
import { ApolloProviderWrapperProps } from "../ApolloProviderWrapper.types";

describe("ApolloProviderWrapper", () => {
  const defaultProps: ApolloProviderWrapperProps = {
    children: "testChildComponent",
  };

  const renderComponent = (args?: any) => {
    const props = { ...defaultProps, ...args };

    render(<ApolloProviderWrapper {...props} />);
  };

  test("should render", async () => {
    renderComponent();
    expect(
      screen.getByText(defaultProps.children as string)
    ).toBeInTheDocument();
  });
});
