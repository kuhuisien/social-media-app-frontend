/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { Form } from "antd";
import AppInput from "../AppInput";
import { AppInputProps } from "../AppInput.types";

describe("AppInput", () => {
  const defaultProps: AppInputProps = {
    label: "Email",
    name: "email",
  };

  const renderComponent = (args?: any) => {
    const props = { ...defaultProps, ...args };

    render(
      <Form>
        <AppInput {...props} />
      </Form>
    );
  };

  test("should render label", async () => {
    renderComponent();
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
  });

  test("should render pasword type input without error", async () => {
    renderComponent({ type: "password" });
  });

  test("should render without error when required=true", async () => {
    renderComponent({ required: true });
  });
});
