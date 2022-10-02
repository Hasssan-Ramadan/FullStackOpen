import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAll } from '../services/anecdotes'

export const intiializeAnecdotes = createAsyncThunk(
  'anedote/intiializeAnecdotes',
  async () => {
    const anecdotes = await getAll()
    return anecdotes
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
    create: (state, action) => {
      return state.concat(action.payload).sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes: (state, action) => {
      return action.payload.sort((a, b) => b.votes - a.votes)
    },
  },
  extraReducers: {
    [intiializeAnecdotes.fulfilled]: (state, { payload }) => {
      return payload
    },
    [intiializeAnecdotes.rejected]: (state) => {
      return state
    },
  },
})

export const { vote, create, setAnecdotes } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer
