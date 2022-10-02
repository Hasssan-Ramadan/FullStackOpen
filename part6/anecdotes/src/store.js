import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import timerIdReducer from './reducers/timerIdReducer'

export default configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    timerId: timerIdReducer,
  },
})
