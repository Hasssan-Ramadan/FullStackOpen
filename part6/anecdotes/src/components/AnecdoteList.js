import { useEffect } from 'react'
import { connect } from 'react-redux'

import { voteAnecdote, intiializeAnecdotes } from '../reducers/anecdoteReducer'
import { display, remove } from '../reducers/notificationReducer'
import { update } from '../reducers/timerIdReducer'

const AnecdoteList = ({
  anecdotes,
  timerId,
  voteAnecdote,
  intiializeAnecdotes,
  display,
  remove,
  update,
}) => {
  const voteAnecdoteHandler = (anecdote) => {
    voteAnecdote(anecdote)
    display(`you voted '${anecdote.content}'`)
    const notifyTimerId = setTimeout(() => remove(), 5000)
    clearTimeout(timerId)
    update(notifyTimerId)
  }

  useEffect(() => {
    intiializeAnecdotes()
  }, [intiializeAnecdotes])

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdoteHandler(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default connect(
  (state) => {
    return {
      anecdotes: state.anecdotes.filter((anecdote) =>
        anecdote.content.includes(state.searchTerm)
      ),
      timerId: state.timerId,
    }
  },
  { voteAnecdote, intiializeAnecdotes, display, update, remove }
)(AnecdoteList)
