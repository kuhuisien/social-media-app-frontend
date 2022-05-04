import { Spin } from "antd";
import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <Spin />
    </div>
  );
};

export default Spinner;
