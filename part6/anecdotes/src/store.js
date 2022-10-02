import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import timerIdReducer from './reducers/timerIdReducer'
import searchTermReducer from './reducers/searchTermReducer'

export default configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    timerId: timerIdReducer,
    searchTerm: searchTermReducer,
  },
})
