/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from "@testing-library/react";
import { formatDate } from "lib/utils/datetime/formatDate";
import Post from "../Post";
import { PostProps } from "../Post.types";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter as Router } from "react-router-dom";

describe("Post", () => {
  const defaultProps: PostProps = {
    title: "testTitle",
    content: "testContent",
    createdAt: "1651562107328",
    postId: "1",
    username: "testUsername",
    userId: "10",
    published: false,
    isMyProfile: false,
  };

  const renderComponent = (args?: any) => {
    const props = { ...defaultProps, ...args };

    render(
      <Router>
        <MockedProvider mocks={[]} addTypename={false}>
          <Post {...props} />
        </MockedProvider>
      </Router>
    );
  };

  test("should render title", async () => {
    renderComponent();
    expect(screen.getByText(defaultProps.title as string)).toBeInTheDocument();
  });

  test("should trigger title click handler without error", async () => {
    renderComponent();
    const component = screen.getByText(defaultProps.title as string);

    fireEvent.click(component);
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
