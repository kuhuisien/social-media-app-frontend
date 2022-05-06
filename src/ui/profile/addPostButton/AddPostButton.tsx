import { gql, useMutation } from "@apollo/client";
import { Button, Modal, Form } from "antd";
import AppInput from "lib/components/formInputs/AppInput/AppInput";
import AppTextArea from "lib/components/formInputs/AppTextArea/AppTextArea";
import { useEffect, useState } from "react";
import { GET_POSTS } from "ui/posts/Posts";
import { GET_PROFILE } from "../Profile";
import styles from "./AddPostButton.module.css";
import { addPostFormFields } from "./addPostFormFields";

const CREATE_POST = gql`
  mutation ($post: PostInput!) {
    postCreate(post: $post) {
      userErrors {
        message
      }
      post {
        title
        content
        published
        createdAt
        user {
          name
        }
      }
    }
  }
`;

const AddPostButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [error, setError] = useState("");

  const [createPost, { data, loading }] = useMutation(CREATE_POST);

  useEffect(() => {
    if (data && data.postCreate) {
      if (data.postCreate.userErrors.length) {
        setError(data.postCreate.userErrors[0].message);
      } else {
        setError("");
        setIsModalVisible(false);
      }
    }
  }, [data]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onOkButtonClick = (values: any) => {
    const title = values[addPostFormFields.title];
    const content = values[addPostFormFields.content];

    createPost({
      variables: { post: { title, content } },
      refetchQueries: [GET_PROFILE, GET_POSTS],
    });
  };

  const onCancelButtonClick = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button size="large" type="primary" onClick={showModal}>
        Add Post
      </Button>

      <Modal
        title="Add Post"
        visible={isModalVisible}
        onCancel={onCancelButtonClick}
        footer={null}
      >
        <Form onFinish={onOkButtonClick}>
          <AppInput
            label="Title"
            name={addPostFormFields.title}
            required
          ></AppInput>

          <AppTextArea
            label="Content"
            name={addPostFormFields.content}
            required
          ></AppTextArea>

          {error && <div className={styles.addPostError}>{error}</div>}

          <Button
            htmlType="submit"
            type="primary"
            className={styles.OkButton}
            disabled={loading}
            loading={loading}
          >
            Ok
          </Button>

          <Button onClick={onCancelButtonClick}>Cancel</Button>
        </Form>
      </Modal>
    </>
  );
};

export default AddPostButton;
