const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
} = require('../utils/list_helper')

const oneBlogList = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
]

const bigList = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '493119960a439565123c06e7',
    title: 'Who am I',
    author: 'Hassan Ramadan',
    url: 'https://github.com/rmdanjr/rmdanjr',
    likes: 43,
    __v: 0,
  },
]

test('dummy returns one', () => {
  const blogs = []

  const result = dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []

    const result = totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(oneBlogList)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = totalLikes(bigList)
    expect(result).toBe(83)
  })
})

describe('favorite blog', () => {
  test('of empty list is empty object', () => {
    const blogs = []

    const result = favoriteBlog(blogs)
    expect(result).toEqual({})
  })

  test('when list has only one blog, is the that blog', () => {
    const expectedResult = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }

    const result = favoriteBlog(oneBlogList)
    expect(result).toEqual(expectedResult)
  })

  test('of a bigger list, is the most liked blog', () => {
    const expectedResult = {
      title: 'Who am I',
      author: 'Hassan Ramadan',
      likes: 43,
    }

    const result = favoriteBlog(bigList)
    expect(result).toEqual(expectedResult)
  })
})

describe('most blogs', () => {
  test('of empty list is object with empty properties', () => {
    const blogs = []
    const expectedResult = {}
    const result = favoriteBlog(blogs)
    expect(result).toEqual(expectedResult)
  })

  test('when list has only one blog, is the object with that blog author', () => {
    const expectedResult = {
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    }

    const result = mostBlogs(oneBlogList)
    expect(result).toEqual(expectedResult)
  })

  test('of a bigger list, is object with the author have the highest number of blogs', () => {
    const expectedResult = {
      author: 'Edsger W. Dijkstra',
      blogs: 8,
    }

    const result = mostBlogs(bigList)
    expect(result).toEqual(expectedResult)
  })
})
