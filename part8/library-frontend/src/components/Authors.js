import { useQuery } from '@apollo/client'
import { GET_AUTHORS } from '../queries'

const Authors = () => {
  const response = useQuery(GET_AUTHORS)
  if (response.loading) return <p>Loading...</p>
  const authors = response.data.allAuthors
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
