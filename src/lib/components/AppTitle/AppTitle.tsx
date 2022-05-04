import Title from "antd/lib/typography/Title";
import { AppTitleProps } from "./AppTitle.types";
import styles from "./AppTitle.module.css";

const AppTitle = ({ displayText }: AppTitleProps) => {
  return <Title className={styles.title}>{displayText}</Title>;
};

export default AppTitle;
