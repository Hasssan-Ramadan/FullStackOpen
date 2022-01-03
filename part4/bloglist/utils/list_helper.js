const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  let numOfLikes = 0
  blogs.forEach((blog) => {
    numOfLikes += blog.likes
  })
  return numOfLikes
}

const formatBlog = (blog) => {
  delete blog._id
  delete blog.url
  delete blog.__v
  return blog
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}

  let returnedBlog = blogs[0]
  blogs.forEach((blog) => {
    if (returnedBlog.likes < blog.likes) returnedBlog = blog
  })
  return formatBlog(returnedBlog)
}

module.exports = { dummy, totalLikes, favoriteBlog }
