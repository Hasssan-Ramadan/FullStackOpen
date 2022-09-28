import React, { useEffect, useState } from 'react'
import blogsService from '../services/blogs'
const Blog = (props) => {
  const [view, setView] = useState(false)
  const [blog, setBlog] = useState(props.blog)

  useEffect(() => {
    blogsService.update(blog);
  }, [blog]);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleView = () => setView(!view)

  return (
    <div style={blogStyle}>
      <p>
        {blog.title} - {blog.author}
        <button onClick={toggleView}>{view ? 'hide' : 'view'}</button>
      </p>
      <div style={{ display: view ? 'block' : 'none' }}>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}
          <button onClick={() => setBlog({ ...blog, likes: blog.likes + 1 })}>
            like
          </button>
        </p>
        <p>{blog.user.name}</p>
        {props.user.id === blog.user.id && (
          <button onClick={() => props.removeBlog(blog)}>remove</button>
        )}
      </div>
    </div>
  )
}
export default Blog
