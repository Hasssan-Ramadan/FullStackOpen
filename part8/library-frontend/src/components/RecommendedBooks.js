import { useQuery } from '@apollo/client'
import { GET_BOOKS, GET_USER } from '../queries'

const RecommendedBooks = () => {
  const userResponse = useQuery(GET_USER)
  const booksResponse = useQuery(GET_BOOKS, {
    variables: {
      genre: userResponse.loading ? '' : userResponse.data.me.favouriteGenre,
    },
  })
  if (userResponse.loading || booksResponse.loading)
    return <div>Loading...</div>
  const recommendedBooks = booksResponse.data.allBooks
  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favourite genre{' '}
        <span style={{ fontWeight: 'bold' }}>
          {userResponse.data.me.favouriteGenre}
        </span>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecommendedBooks
