import { Button } from "antd";
import styles from "./PublishButton.module.css";
import { gql, useMutation } from "@apollo/client";
import { PublishButtonProps } from "./PublishButton.types";

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
  const [publishPost, { data, error, loading }] = useMutation(PUBLISH_POST);

  const onClickPublishButton = () => {
    publishPost({ variables: { postId } });
  };

  return (
    <div className={styles.publishButtonContainer}>
      <Button
        className={styles.publishLinkButton}
        onClick={onClickPublishButton}
      >
        Publish
      </Button>
    </div>
  );
};

export default PublishButton;
