import { useEffect, useState } from 'react'
import { useSubscription, useApolloClient } from '@apollo/client'

import { BOOK_ADDED, GET_BOOKS, GET_AUTHORS } from './queries'

import Authors from './components/Authors'
import Books from './components/Books'
import EditAuthor from './components/EditAuthor'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import RecommendedBooks from './components/RecommendedBooks'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('user-token')
    if (token) setToken(token)
  }, [])

  const client = useApolloClient()
  const handleLogout = () => {
    if (page === 'edit') setPage('authors')
    setToken(null)
    localStorage.clear()
    client.clearStore()
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)

      for (const genre of [...addedBook.genres, '']) {
        client.cache.updateQuery(
          { query: GET_BOOKS, variables: { genre } },
          ({ allBooks }) => {
            return {
              allBooks: allBooks.concat(addedBook),
            }
          }
        )
      }
      client.cache.updateQuery({ query: GET_AUTHORS }, ({ allAuthors }) => {
        if (allAuthors.find((author) => author.name === addedBook.author.name))
          return {
            allAuthors: allAuthors.map((author) =>
              author.name === addedBook.author.name ? addedBook.author : author
            ),
          }
        else
          return {
            allAuthors: allAuthors.concat(addedBook.author),
          }
      })
    },
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('recommends')}>
              recommendations
            </button>
            <button onClick={() => setPage('add-book')}>add book</button>
            <button onClick={() => setPage('edit-author')}>edit author</button>
            <button onClick={handleLogout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>
      {page === 'login' ? (
        <LoginForm setToken={setToken} setPage={setPage} />
      ) : page === 'authors' ? (
        <Authors />
      ) : page === 'books' ? (
        <Books />
      ) : page === 'recommends' ? (
        <RecommendedBooks />
      ) : page === 'add-book' ? (
        <NewBook />
      ) : (
        <EditAuthor />
      )}
    </div>
  )
}

export default App
