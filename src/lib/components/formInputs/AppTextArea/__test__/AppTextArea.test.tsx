/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { Form } from "antd";
import AppTextArea from "../AppTextArea";
import { AppTextAreaProps } from "../AppTextArea.types";

describe("AppTextArea", () => {
  const defaultProps: AppTextAreaProps = {
    label: "Email",
    name: "email",
  };

  const renderComponent = (args?: any) => {
    const props = { ...defaultProps, ...args };

    render(
      <Form>
        <AppTextArea {...props} />
      </Form>
    );
  };

  test("should render label", async () => {
    renderComponent();
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
  });

  test("should render without error when required=true", async () => {
    renderComponent({ required: true });
  });
});
