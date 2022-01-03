const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  let numOfLikes = 0
  blogs.forEach((blog) => {
    numOfLikes += blog.likes
  })
  return numOfLikes
}

module.exports = { dummy, totalLikes }
