import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    display: (state, action) => {
      return action.payload
    },
    remove: (state, action) => {
      return ''
    },
  },
})

export const { display, remove } = notificationSlice.actions
export default notificationSlice.reducer
