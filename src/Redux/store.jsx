import { configureStore } from '@reduxjs/toolkit'
import allTodos from './slice/todos/allTodos'

export const store = configureStore({
  reducer: {
    allTodos: allTodos,

  },
})