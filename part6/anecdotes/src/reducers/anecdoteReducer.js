import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAll, createOne, voteOne } from '../services/anecdotes'

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

export const voteAnecdote = createAsyncThunk(
  'anecdote/voteAnecdote',
  async (anecdoteBeforeVote) => {
    const votedAnecdote = await voteOne(anecdoteBeforeVote)
    return votedAnecdote
  }
)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {},
  extraReducers: {
    [intiializeAnecdotes.fulfilled]: (state, action) => {
      return action.payload.sort((a, b) => b.votes - a.votes)
    },
    [intiializeAnecdotes.rejected]: (state, action) => {
      return state
    },
    [createAnecdote.fulfilled]: (state, action) => {
      return state.concat(action.payload).sort((a, b) => b.votes - a.votes)
    },
    [createAnecdote.rejected]: (state, action) => {
      return state
    },
    [voteAnecdote.fulfilled]: (state, action) => {
      return state
        .map((anecdote) =>
          anecdote.id === action.payload.id ? action.payload : anecdote
        )
        .sort((a, b) => b.votes - a.votes)
    },
    [voteAnecdote.rejected]: (state, action) => {
      return state
    },
  },
})

export const { setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
