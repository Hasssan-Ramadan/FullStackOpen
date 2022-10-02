import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({
      type: 'VOTE_ANECDOTE',
      payload: { id },
    })
  }

  const create = (content) => {
    dispatch({
      type: 'CREATE_ANECDOTE',
      payload: { content },
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          if (event.target.anecdote.value) create(event.target.anecdote.value)
          event.target.anecdote.value = ''
        }}
      >
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App
