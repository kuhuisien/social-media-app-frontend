import React from "react";

export interface PostProps {
  title: string | null;

  content: string | null;

  createdAt: string | null;

  postId: React.Key | null | undefined;

  username: string | null;

  published: boolean;

  isMyProfile: boolean;
}
