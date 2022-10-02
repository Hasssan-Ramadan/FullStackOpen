import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers/anecdoteReducer'

export default configureStore({ reducer })
