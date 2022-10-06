import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_AUTHOR, GET_AUTHORS } from '../queries'

const EditAuthor = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const response = useQuery(GET_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR)

  if (response.loading) return <p>Loading...</p>

  const authors = response.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({
      variables: { name, setBornTo: Number(born) },
      refetchQueries: [{ query: GET_AUTHORS }],
    })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default EditAuthor
