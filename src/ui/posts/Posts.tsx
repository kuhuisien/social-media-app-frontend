import { gql, useQuery } from "@apollo/client";
import { Key } from "react";
import Spinner from "lib/components/Spinner/Spinner";
import Post from "../../lib/components/Post/Post";
import styles from "./Posts.module.css";
import AppTitle from "lib/components/AppTitle/AppTitle";

export const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
      createdAt
      published
      user {
        id
        name
      }
    }
  }
`;

const Posts = () => {
  const { data, error, loading } = useQuery(GET_POSTS);

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.postsContainer}>
      <AppTitle displayText="Posts"></AppTitle>

      <div className={styles.postListContainer}>
        {data.posts.map(
          (post: {
            id: Key | null;
            title: string | null;
            content: string | null;
            user: { name: string | null; id: string | null };
            createdAt: string | null;
            published: boolean;
            isMyProfile: boolean;
          }) => (
            <Post
              key={post.id}
              title={post.title}
              content={post.content}
              postId={post.id}
              username={post.user.name}
              userId={post.user.id}
              createdAt={post.createdAt}
              published={post.published}
              isMyProfile={false} // posts display always treat post as public
            />
          )
        )}
      </div>
    </div>
  );
};

export default Posts;
