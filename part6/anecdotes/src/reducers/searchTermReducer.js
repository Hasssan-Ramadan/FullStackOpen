import { createSlice } from '@reduxjs/toolkit'

const searchTermSlice = createSlice({
  name: 'searchTerm',
  initialState: '',
  reducers: {
    update: (state, action) => {
      return action.payload
    },
  },
})

export const { update } = searchTermSlice.actions
export default searchTermSlice.reducer
