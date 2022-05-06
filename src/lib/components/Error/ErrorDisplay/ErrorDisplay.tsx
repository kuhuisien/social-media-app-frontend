import styles from "./ErrorDisplay.module.css";
import { ErrorDisplayProps } from "./ErrorDisplay.types";
import { Typography } from "antd";

const { Title } = Typography;

const ErrorDisplay = ({ error }: ErrorDisplayProps) => {
  return (
    <div className={styles.error}>
      <Title>Error</Title>
      <div>{error.message}</div>
    </div>
  );
};

export default ErrorDisplay;
