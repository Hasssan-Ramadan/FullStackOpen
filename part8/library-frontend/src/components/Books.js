import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_BOOKS } from '../queries'

const Books = () => {
  const [currentGenre, setCurrentGenre] = useState('')
  const [allGenres, setAllGenres] = useState([])
  const response = useQuery(GET_BOOKS, { variables: { genre: currentGenre } })
  useEffect(() => {
    if (response.data)
      setAllGenres([
        ...new Set(
          []
            .concat(allGenres)
            .concat(...response.data.allBooks.map((book) => book.genres))
        ),
      ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response.data])

  return (
    <div>
      <h2>books</h2>
      <button onClick={() => setCurrentGenre('')}>All</button>
      {allGenres.map((genre) => (
        <button key={genre} onClick={() => setCurrentGenre(genre)}>
          {genre}
        </button>
      ))}
      {response.loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {response.data.allBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Books
