import { PostProps } from "./Post.types";
import styles from "./Post.module.css";
import { formatDate } from "lib/utils/datetime/formatDate";

const Post = ({
  title,
  content,
  createdAt,
  username,
  published,
}: PostProps) => {
  const postContainerClass = published
    ? styles.postContainer
    : styles.postContainer + " " + styles.unpublishedPost;

  return (
    <div className={postContainerClass}>
      <div className={styles.postAuthor}>{username}</div>
      <div className={styles.postTitle}>{title}</div>

      <div className={styles.postContent}>{content}</div>

      <div className={styles.postCreationDateTime}>
        Posted at {formatDate(createdAt)}
      </div>
    </div>
  );
};

export default Post;
