import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAll, createOne } from '../services/anecdotes'

export const intiializeAnecdotes = createAsyncThunk(
  'anedote/intiializeAnecdotes',
  async () => {
    const anecdotes = await getAll()
    return anecdotes
  }
)

export const createAnecdote = createAsyncThunk(
  'anecdote/createAnecdote',
  async (newAnecdote) => {
    const savedAnecdote = await createOne(newAnecdote)
    return savedAnecdote
  }
)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      return state
        .map((anecdote) =>
          anecdote.id === action.payload
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote
        )
        .sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes: (state, action) => {
      return action.payload.sort((a, b) => b.votes - a.votes)
    },
  },
  extraReducers: {
    [intiializeAnecdotes.fulfilled]: (state, action) => {
      return action.payload.sort((a, b) => b.votes - a.votes)
    },
    [intiializeAnecdotes.rejected]: (state) => {
      return state
    },
    [createAnecdote.fulfilled]: (state, action) => {
      return state.concat(action.payload).sort((a, b) => b.votes - a.votes)
    },
    [createAnecdote.rejected]: (state) => {
      return state
    },
  },
})

export const { vote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
