import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './features/todo/reducers/todoSlice'
export default configureStore({
  reducer: {
    todo: todoReducer
  }
})