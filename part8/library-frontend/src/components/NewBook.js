import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ADD_BOOK, GET_BOOKS, GET_AUTHORS } from '../queries'

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK)
  const response = useQuery(GET_AUTHORS)
  if (response.loading) return <p>Loading...</p>
  const authors = response.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()

    addBook({
      variables: { title, author, published: Number(published), genres },
      update: (cache, response) => {
        for (const genre of [...response.data.addBook.genres, '']) {
          cache.updateQuery(
            { query: GET_BOOKS, variables: { genre } },
            ({ allBooks }) => {
              return {
                allBooks: allBooks.concat(response.data.addBook),
              }
            }
          )
        }
        cache.updateQuery({ query: GET_AUTHORS }, ({ allAuthors }) => {
          if (
            allAuthors.find(
              (author) => author.name === response.data.addBook.author.name
            )
          )
            return {
              allAuthors: allAuthors.map((author) =>
                author.name === response.data.addBook.author.name
                  ? response.data.addBook.author
                  : author
              ),
            }
          else
            return {
              allAuthors: allAuthors.concat(response.data.addBook.author),
            }
        })
      },
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <select
            name='name'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          >
            <option value='' disabled>
              select author
            </option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(', ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
