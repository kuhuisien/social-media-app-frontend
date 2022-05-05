import { Button } from "antd";
import styles from "./PublishButton.module.css";
import { gql, useMutation } from "@apollo/client";
import { PublishButtonProps } from "./PublishButton.types";
import { GET_PROFILE } from "ui/profile/Profile";
import { GET_POSTS } from "ui/posts/Posts";

const PUBLISH_POST = gql`
  mutation ($postId: ID!) {
    postPublish(postId: $postId) {
      userErrors {
        message
      }
      post {
        title
      }
    }
  }
`;

const PublishButton = ({ postId }: PublishButtonProps) => {
  const [publishPost, { loading, data }] = useMutation(PUBLISH_POST);

  const onClickPublishButton = () => {
    publishPost({
      variables: { postId },
      refetchQueries: [GET_PROFILE, GET_POSTS],
    });
  };

  return (
    <div className={styles.publishButtonContainer}>
      <Button
        className={styles.publishLinkButton}
        onClick={onClickPublishButton}
        loading={loading}
      >
        {!data && "Publish"}
      </Button>
    </div>
  );
};

export default PublishButton;
