require('dotenv').config()
const mongoose = require('mongoose')
const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server')
const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('connected to db'))
  .catch((error) => console.log(error.message))

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    addAuthor(name: String!, born: Int!): Author!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Author: {
    bookCount: async (root) => await Book.count({ author: root.id }),
  },
  Book: {
    author: async (root, args) => await Author.findById(root.author),
  },
  Query: {
    bookCount: async () => await Book.count({}),
    authorCount: async () => await Author.count({}),
    allBooks: async (root, args) => {
      const filterObj = {}
      if (args.author) filterObj.author = args.author
      if (args.genre) filterObj.genres = args.genre
      return await Book.find(filterObj)
    },
    allAuthors: async () => await Author.find({}),
    me: async (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser)
        throw new AuthenticationError('not authenticated')
      const bookToSave = new Book(args)
      try {
        const savedBook = await bookToSave.save()
        return savedBook
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    addAuthor: async (root, args, context) => {
      if (!context.currentUser)
        throw new AuthenticationError('not authenticated')
      const authorToSave = new Author(args)
      try {
        const savedAuthor = await authorToSave.save()
        return savedAuthor
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser)
        throw new AuthenticationError('not authenticated')
      try {
        const updatedAuthor = await Author.findOneAndUpdate(
          { name: args.name },
          { name: args.name, born: args.setBornTo },
          { new: true }
        )
        return updatedAuthor
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    createUser: async (root, args) => {
      const userToSave = new User(args)
      try {
        const savedUser = await userToSave.save()
        return savedUser
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }
      const userToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userToken, process.env.JWT_SECRET) }
    },
  },
}

const context = async ({ req }) => {
  const auth = req ? req.headers.authorization : null
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
    const currentUser = await User.findById(decodedToken.id)
    return { currentUser }
  }
}

const server = new ApolloServer({ typeDefs, resolvers, context })

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
