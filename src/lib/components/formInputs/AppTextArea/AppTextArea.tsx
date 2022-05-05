import { Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { AppTextAreaProps } from "./AppTextArea.types";

const AppTextArea = ({ label, name, required }: AppTextAreaProps) => {
  return (
    <Form.Item labelCol={{ span: 24 }} label={label} name={name}>
      <TextArea rows={2} required={required} />
    </Form.Item>
  );
};

export default AppTextArea;
