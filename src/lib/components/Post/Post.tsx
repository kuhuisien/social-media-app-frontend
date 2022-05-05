import { PostProps } from "./Post.types";
import styles from "./Post.module.css";
import { formatDate } from "lib/utils/datetime/formatDate";
import PublishButton from "./PublishButton/PublishButton";
import UnpublishButton from "./UnpublishButton/UnpublishButton";

const Post = ({
  title,
  content,
  createdAt,
  username,
  published,
  isMyProfile,
  postId,
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

      {isMyProfile && !published && <PublishButton postId={postId} />}

      {isMyProfile && published && <UnpublishButton postId={postId} />}
    </div>
  );
};

export default Post;
