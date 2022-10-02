import { useDispatch } from 'react-redux'

import { create } from '../actions/anecdoteActions'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdoteHandler = (event) => {
    event.preventDefault()
    const anecdoteContent = event.target.anecdote.value
    if (anecdoteContent) dispatch(create(anecdoteContent))
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdoteHandler}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
