import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import EditAuthor from './components/EditAuthor'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
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
