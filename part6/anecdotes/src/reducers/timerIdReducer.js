import { createSlice } from '@reduxjs/toolkit'

const timerIdSlice = createSlice({
  name: 'timerId',
  initialState: 0,
  reducers: {
    update: (state, action) => {
      return action.payload
    },
  },
})

export const { update } = timerIdSlice.actions
export default timerIdSlice.reducer
