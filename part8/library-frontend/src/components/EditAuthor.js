import { useMutation, useQuery } from '@apollo/client'
import { EDIT_AUTHOR, GET_AUTHORS } from '../queries'

const EditAuthor = () => {
  const response = useQuery(GET_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR)

  if (response.loading) return <p>Loading...</p>

  const authors = response.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({
      variables: {
        name: event.target.name.value,
        setBornTo: Number(event.target.born.value),
      },
      update: (cache, response) => {
        cache.updateQuery({ query: GET_AUTHORS }, ({ allAuthors }) => {
          return {
            allAuthors: allAuthors.map((author) =>
              author.name === response.data.editAuthor.name
                ? response.data.editAuthor
                : author
            ),
          }
        })
      },
    })
    event.target.name.value = ''
    event.target.born.value = ''
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select name='name' defaultValue=''>
            <option value='' disabled>
              select author
            </option>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input name='born' />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default EditAuthor
