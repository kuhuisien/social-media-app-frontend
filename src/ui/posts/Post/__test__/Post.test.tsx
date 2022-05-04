/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { formatDate } from "lib/utils/datetime/formatDate";
import Post from "../Post";
import { PostProps } from "../Post.types";

describe("Post", () => {
  const defaultProps: PostProps = {
    title: "testTitle",
    content: "testContent",
    createdAt: "1651562107328",
    id: "1",
    username: "testUsername",
  };

  const renderComponent = (args?: any) => {
    const props = { ...defaultProps, ...args };

    render(<Post {...props} />);
  };

  test("should render title", async () => {
    renderComponent();
    expect(screen.getByText(defaultProps.title as string)).toBeInTheDocument();
  });

  test("should render content", async () => {
    renderComponent();
    expect(
      screen.getByText(defaultProps.content as string)
    ).toBeInTheDocument();
  });

  test("should render well-formatted post creation datetime", async () => {
    renderComponent();
    expect(
      screen.getByText(
        "Posted at " + formatDate(defaultProps.createdAt as string)
      )
    ).toBeInTheDocument();
  });

  test("should render username", async () => {
    renderComponent();
    expect(
      screen.getByText(defaultProps.username as string)
    ).toBeInTheDocument();
  });
});
