import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Blog from "./Blog";

/*
 * checks that the component displaying a blog
 * renders the blog's title and author,
 * but does not render its url or number of likes by default.
 */
describe("<Blog/>", () => {
  const user = {
    name: "Hassan Ramadan",
    username: "RmdanJr",
    id: "200",
  };
  const blog = {
    id: "200",
    title: "How to be a self-taught software developer?",
    author: "Ahmed Ali",
    url: "https://google.com",
    likes: 23,
    user: user,
  };

  test("renders title and author by default", () => {
    render(<Blog blog={blog} user={user} />);
    const titleEl = screen.getByText(
      "How to be a self-taught software developer?",
      { exact: false }
    );
    const authorEl = screen.getByText("Ahmed Ali", { exact: false });
    expect(titleEl.parentElement).toHaveStyle("display: block");;
    expect(authorEl.parentElement).toHaveStyle("display: block");;
  });

  test("does not render its url or number of likes by default", () => {
    render(<Blog blog={blog} user={user} />);
    const urlEl = screen.getByText("https://google.com");
    const likesEl = screen.getByText("23", { exact: false });
    expect(urlEl.parentElement).toHaveStyle("display: none");
    expect(likesEl.parentElement).toHaveStyle("display: none");
  });
});
