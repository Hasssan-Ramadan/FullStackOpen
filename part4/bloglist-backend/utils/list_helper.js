const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  let numOfLikes = 0;
  blogs.forEach((blog) => {
    numOfLikes += blog.likes;
  });
  return numOfLikes;
};

const formatBlog = (blog) => {
  delete blog._id;
  delete blog.url;
  delete blog.__v;
  return blog;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};

  let returnedBlog = blogs[0];
  blogs.forEach((blog) => {
    if (returnedBlog.likes < blog.likes) returnedBlog = blog;
  });
  return formatBlog(returnedBlog);
};

const mostBlogs = (blogs) => {
  let returnedObj = { author: "", blogs: 0 };
  authorBlogsMap = new Map();
  blogs.forEach((blog) =>
    authorBlogsMap.set(
      blog.author,
      (authorBlogsMap.get(blog.author) ? authorBlogsMap.get(blog.author) : 0) +
        1
    )
  );
  for (const [author, numOfBlogs] of authorBlogsMap)
    if (numOfBlogs > returnedObj.blogs) {
      returnedObj.author = author;
      returnedObj.blogs = numOfBlogs;
    }
  return returnedObj;
};

const mostLikes = (blogs) => {
  let returnedObj = { author: "", likes: 0 };
  const authorLikesMap = new Map();
  blogs.forEach((blog) =>
    authorLikesMap.set(
      blog.author,
      (authorLikesMap.get(blog.author) ? authorLikesMap.get(blog.author) : 0) +
        blog.likes
    )
  );
  for (const [author, blogsLikes] of authorLikesMap)
    if (blogsLikes > returnedObj.likes) {
      returnedObj.author = author;
      returnedObj.likes = blogsLikes;
    }
  return returnedObj;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
