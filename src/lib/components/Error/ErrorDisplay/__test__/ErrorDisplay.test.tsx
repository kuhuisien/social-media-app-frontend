import { render, screen } from "@testing-library/react";
import ErrorDisplay from "../ErrorDisplay";

describe("ErrorDisplay", () => {
  const renderComponent = () => {
    render(<ErrorDisplay />);
  };

  test("should render", async () => {
    renderComponent();
    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});
