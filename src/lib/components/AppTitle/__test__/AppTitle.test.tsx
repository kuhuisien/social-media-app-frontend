/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import AppTitle from "../AppTitle";
import { AppTitleProps } from "../AppTitle.types";

describe("AppTitle", () => {
  const defaultProps: AppTitleProps = { displayText: "testDisplayText" };

  const renderComponent = (args?: any) => {
    const props = { ...defaultProps, ...args };

    render(<AppTitle {...props} />);
  };

  test("shoul render", async () => {
    renderComponent();
    expect(screen.getByText(defaultProps.displayText)).toBeInTheDocument();
  });
});
