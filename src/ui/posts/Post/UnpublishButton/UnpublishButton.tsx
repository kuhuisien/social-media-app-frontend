import { gql, useMutation } from "@apollo/client";
import { Button } from "antd";
import styles from "./UnpublishButton.module.css";
import { UnpublishButtonProps } from "./UnpublishButton.types";

const UNPUBLISH_POST = gql`
  mutation ($postId: ID!) {
    postUnpublish(postId: $postId) {
      userErrors {
        message
      }
      post {
        title
      }
    }
  }
`;

const UnpublishButton = ({ postId }: UnpublishButtonProps) => {
  const [unpublishPost, { data, error, loading }] = useMutation(UNPUBLISH_POST);

  const onClickUnpublishButton = () => {
    unpublishPost({ variables: { postId } });
  };

  return (
    <div className={styles.unpublishButtonContainer}>
      <Button
        className={styles.unpublishLinkButton}
        onClick={onClickUnpublishButton}
      >
        Unpublish
      </Button>
    </div>
  );
};

export default UnpublishButton;
