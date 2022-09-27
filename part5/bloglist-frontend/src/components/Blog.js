import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [view, setView] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleView = () => setView(!view);

  return (
    <div style={blogStyle}>
      <p>
        {blog.title} - {blog.author}
        <button onClick={toggleView}>{view ? "hide" : "view"}</button>
      </p>
      <div style={{ display: view ? "block" : "none" }}>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes} <button>like</button>
        </p>
        <p>{blog.user.name}</p>
      </div>
    </div>
  );
};

export default Blog;
