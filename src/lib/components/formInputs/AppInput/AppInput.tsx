import { Form, Input } from "antd";
import { AppInputProps } from "./AppInput.types";

const AppInput = ({ label, name, required, type }: AppInputProps) => {
  return (
    <Form.Item
      rules={
        type === "email"
          ? [
              {
                type: "email",
                message: "Invalid email",
              },
            ]
          : undefined
      }
      labelCol={{ span: 24 }}
      label={label}
      name={name}
    >
      <Input type={type} required={required} />
    </Form.Item>
  );
};

export default AppInput;
