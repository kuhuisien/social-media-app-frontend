import { PostProps } from "./Post.types";
import styles from "./Post.module.css";
import { formatDate } from "lib/utils/datetime/formatDate";
import PublishButton from "./PublishButton/PublishButton";
import UnpublishButton from "./UnpublishButton/UnpublishButton";
import { useNavigate } from "react-router-dom";

const Post = ({
  title,
  content,
  createdAt,
  username,
  userId,
  published,
  isMyProfile,
  postId,
}: PostProps) => {
  const navigate = useNavigate();

  const postContainerClass = published
    ? styles.postContainer
    : styles.postContainer + " " + styles.unpublishedPost;

  const onClickPostAuthor = () => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className={postContainerClass}>
      <div className={styles.postAuthor} onClick={onClickPostAuthor}>
        {username}
      </div>

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
