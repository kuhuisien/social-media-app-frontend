import { PostProps } from "./Post.types";
import styles from "./Post.module.css";
import { formatDate } from "lib/utils/datetime/formatDate";

const Post = ({ title, content, createdAt, id, username }: PostProps) => {
  return (
    <div className={styles.postContainer}>
      <div className={styles.postAuthor}>{username}</div>
      <div className={styles.postTitle}>{title}</div>

      <div>{content}</div>

      <div className={styles.postCreationDateTime}>
        Posted at {formatDate(createdAt)}
      </div>
    </div>
  );
};

export default Post;
