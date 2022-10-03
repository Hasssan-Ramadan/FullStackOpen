import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

import { display, remove } from '../reducers/notificationReducer'
import { update } from '../reducers/timerIdReducer'

const AnecdoteForm = ({ timerId, createAnecdote, display, remove, update }) => {
  const createAnecdoteHandler = (event) => {
    event.preventDefault()
    const anecdoteContent = event.target.anecdote.value
    if (anecdoteContent) {
      createAnecdote({ content: anecdoteContent, votes: 0 })
      display(`you created '${anecdoteContent}'`)
      const notifyTimerId = setTimeout(() => remove(), 5000)
      clearTimeout(timerId)
      update(notifyTimerId)
    }
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

export default connect(
  (state) => {
    return { timerId: state.timerId }
  },
  { createAnecdote, display, update, remove }
)(AnecdoteForm)
