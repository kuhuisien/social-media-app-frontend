import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Spinner from "lib/components/Spinner/Spinner";
import AppTitle from "lib/components/AppTitle/AppTitle";
import styles from "./Profile.module.css";
import Post from "lib/components/Post/Post";
import { Key } from "react";
import AddPostButton from "./addPostButton/AddPostButton";
import ErrorDisplay from "lib/components/Error/ErrorDisplay/ErrorDisplay";

export const GET_PROFILE = gql`
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
          published
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
    return <ErrorDisplay error={error} />;
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
            published: boolean;
          }) => (
            <Post
              key={post.id}
              title={post.title}
              content={post.content}
              createdAt={post.createdAt}
              postId={post.id}
              published={post.published}
              username={""} // avoid showing username
              userId={profile.user.id}
              isMyProfile={profile.isMyProfile}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Profile;
