// todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    list: [],
    status: null,
    error: null,
  },
  reducers: {
    fetchTodosRequest: (state) => {
      state.status = 'loading';
    },
    fetchTodosSuccess: (state, action) => {
      state.status = 'succeeded';
      state.list = action.payload;
    },
    fetchTodosFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    addTodoRequest: (state) => {
      state.status = 'loading';
    },
    addTodoSuccess: (state, action) => {
      state.status = 'succeeded';
      state.list.push(action.payload);
    },
    addTodoFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    deleteTodoRequest: (state) => {
      state.status = 'loading';
    },
    deleteTodoSuccess: (state, action) => {
      state.status = 'succeeded';
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
    deleteTodoFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    updateTodoRequest: (state) => {
      state.status = 'loading';
    },
    updateTodoSuccess: (state, action) => {
      state.status = 'succeeded';
      const index = state.list.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    updateTodoFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoRequest,
  addTodoSuccess,
  addTodoFailure,
  deleteTodoRequest,
  deleteTodoSuccess,
  deleteTodoFailure,
  updateTodoRequest,
  updateTodoSuccess,
  updateTodoFailure,
} = todoSlice.actions;

export default todoSlice.reducer;
