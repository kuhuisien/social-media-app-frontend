/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { formatDate } from "lib/utils/datetime/formatDate";
import Post from "../Post";
import { PostProps } from "../Post.types";
import { MockedProvider } from "@apollo/client/testing";

describe("Post", () => {
  const defaultProps: PostProps = {
    title: "testTitle",
    content: "testContent",
    createdAt: "1651562107328",
    postId: "1",
    username: "testUsername",
    published: false,
    isMyProfile: false,
  };

  const renderComponent = (args?: any) => {
    const props = { ...defaultProps, ...args };

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Post {...props} />
      </MockedProvider>
    );
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

  test("should not render Publish Button or Unpublish button if isMyProfile=false", async () => {
    renderComponent();

    expect(screen.queryByText("Publish")).not.toBeInTheDocument();
    expect(screen.queryByText("Unpublish")).not.toBeInTheDocument();
  });

  test("should render Publish Button if isMyProfile=true and published=false", async () => {
    renderComponent({ isMyProfile: true });

    expect(screen.queryByText("Publish")).toBeInTheDocument();
  });

  test("should render Unpublish Button if isMyProfile=true and published=true", async () => {
    renderComponent({ isMyProfile: true, published: true });

    expect(screen.queryByText("Unpublish")).toBeInTheDocument();
  });
});
