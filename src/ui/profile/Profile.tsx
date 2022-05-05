import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Spinner from "lib/components/Spinner/Spinner";
import AppTitle from "lib/components/AppTitle/AppTitle";
import styles from "./Profile.module.css";
import Post from "ui/posts/Post/Post";
import { Key } from "react";
import AddPostButton from "./addPostButton/AddPostButton";

const GET_PROFILE = gql`
  query ($userId: ID!) {
    profile(userId: $userId) {
      bio
      isMyProfile
      user {
        id
        name
        posts {
          id
          title
          content
          createdAt
        }
      }
    }
  }
`;

const Profile = () => {
  const { id } = useParams();

  const { data, error, loading } = useQuery(GET_PROFILE, {
    variables: { userId: id },
  });

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return <Spinner />;
  }

  const { profile } = data;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileTitleContainer}>
        <AppTitle displayText={profile.user.name}></AppTitle>

        {profile.isMyProfile && <AddPostButton />}
      </div>

      <div className={styles.profileBioContainer}>{profile.bio}</div>

      <div className={styles.profilePostsContainer}>
        {profile.user.posts.map(
          (post: {
            id: Key | null | undefined;
            title: string | null;
            content: string | null;
            createdAt: string | null;
          }) => (
            <Post
              key={post.id}
              title={post.title}
              content={post.content}
              createdAt={post.createdAt}
              id={post.id}
              username={""} // avoid showing username
            />
          )
        )}
      </div>
    </div>
  );
};

export default Profile;
