/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import ErrorFallback from "../ErrorFallback";
import { ErrorFallbackProps } from "../ErrorFallback.types";

describe("ErrorFallback", () => {
  const defaultProps: ErrorFallbackProps = {
    error: new Error("test error"),
    resetErrorBoundary: jest.fn(),
  };

  const renderComponent = (args?: any) => {
    const props = { ...defaultProps, ...args };

    render(<ErrorFallback {...props} />);
  };

  test("should render error message", async () => {
    renderComponent();
    expect(screen.getByText("test error")).toBeInTheDocument();
  });
});
