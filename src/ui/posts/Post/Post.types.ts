import React from "react";

export interface PostProps {
  title: string | null;

  content: string | null;

  createdAt: string | null;

  id: React.Key | null | undefined;

  username: string | null;
}
