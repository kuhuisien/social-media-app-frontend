import { gql, useMutation } from "@apollo/client";
import { Button } from "antd";
import { GET_POSTS } from "ui/posts/Posts";
import { GET_PROFILE } from "ui/profile/Profile";
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
  const [unpublishPost, { loading, data }] = useMutation(UNPUBLISH_POST);

  const onClickUnpublishButton = () => {
    unpublishPost({
      variables: { postId },
      refetchQueries: [GET_PROFILE, GET_POSTS],
    });
  };

  return (
    <div className={styles.unpublishButtonContainer}>
      <Button
        className={styles.unpublishLinkButton}
        onClick={onClickUnpublishButton}
        loading={loading}
      >
        {!data && "Unpublish"}
      </Button>
    </div>
  );
};

export default UnpublishButton;
