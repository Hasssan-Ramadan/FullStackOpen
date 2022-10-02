import axios from 'axios'

export const getAll = async () => {
  const response = await axios.get('http://localhost:3001/anecdotes')
  return response.data
}

export const createOne = async (newAnecdote) => {
  const response = await axios.post(
    'http://localhost:3001/anecdotes',
    newAnecdote
  )
  return response.data
}
