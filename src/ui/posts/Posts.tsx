import { gql, useQuery } from "@apollo/client";
import { Key } from "react";
import Spinner from "lib/components/Spinner/Spinner";
import Post from "./Post/Post";
import styles from "./Posts.module.css";
import AppTitle from "lib/components/AppTitle/AppTitle";

const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
      createdAt
      user {
        name
      }
    }
  }
`;

const Posts = () => {
  const { data, error, loading } = useQuery(GET_POSTS);

  console.log(error);

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <AppTitle displayText="Posts"></AppTitle>

      <div className={styles.postsContainer}>
        {data.posts.map(
          (post: {
            id: Key | null;
            title: string | null;
            content: string | null;
            user: { name: string | null };
            createdAt: string | null;
          }) => (
            <Post
              key={post.id}
              title={post.title}
              content={post.content}
              id={post.id}
              username={post.user.name}
              createdAt={post.createdAt}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Posts;
