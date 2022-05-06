import { render, screen } from "@testing-library/react";
import ErrorDisplay from "../ErrorDisplay";
import { ErrorDisplayProps } from "../ErrorDisplay.types";

describe("ErrorDisplay", () => {
  const defaultProps: ErrorDisplayProps = { error: new Error("test error") };

  const renderComponent = () => {
    render(<ErrorDisplay {...defaultProps} />);
  };

  test("should render error message", () => {
    renderComponent();
    expect(screen.getByText("test error")).toBeInTheDocument();
  });
});
