const { UserInputError, AuthenticationError } = require('apollo-server-core')
const jwt = require('jsonwebtoken')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
  Query: {
    bookCount: async () => await Book.count({}),
    authorCount: async () => await Author.count({}),
    allBooks: async (root, args) => {
      const filterObj = {}
      if (args.author) filterObj.author = args.author
      if (args.genre) filterObj.genres = args.genre
      return await Book.find(filterObj).populate('author')
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
        const bookAuthor = await Author.findById(savedBook.author)
        bookAuthor.bookCount += 1
        await bookAuthor.save()
        pubsub.publish('BOOK_ADDED', {
          bookAdded: savedBook.populate('author'),
        })
        return await savedBook.populate('author')
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
  Subscription: {
    bookAdded: { subscribe: () => pubsub.asyncIterator('BOOK_ADDED') },
  },
}

module.exports = resolvers
