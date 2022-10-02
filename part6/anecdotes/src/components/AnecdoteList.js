import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { vote, intiializeAnecdotes } from '../reducers/anecdoteReducer'
import { display } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const searchTerm = useSelector((state) => state.searchTerm)
  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.includes(searchTerm)
  )

  const dispatch = useDispatch()
  const voteAnecdoteHandler = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(display(`you voted '${anecdote.content}'`))
  }

  useEffect(() => {
    dispatch(intiializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      {filteredAnecdotes.map((anecdote) => (
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

export default AnecdoteList
