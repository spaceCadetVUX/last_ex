// todoSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoSuccess,
  deleteTodoSuccess,
  updateTodoSuccess,
} from './todoSlice';

// API URL
const API_URL = 'https://66ff44c52b9aac9c997ebcd3.mockapi.io/api/chotam/hello';

// Fetch todos
function* fetchTodosSaga() {
  try {
    const response = yield call(axios.get, API_URL);
    yield put(fetchTodosSuccess(response.data));
  } catch (error) {
    yield put(fetchTodosFailure(error.message));
  }
}

// Add todo
function* addTodoSaga(action) {
  try {
    const response = yield call(axios.post, API_URL, action.payload);
    yield put(addTodoSuccess(response.data));
  } catch (error) {
    yield put(fetchTodosFailure(error.message));
  }
}

// Delete todo
function* deleteTodoSaga(action) {
  try {
    yield call(axios.delete, `${API_URL}/${action.payload}`);
    yield put(deleteTodoSuccess(action.payload));
  } catch (error) {
    yield put(fetchTodosFailure(error.message));
  }
}

// Update todo
function* updateTodoSaga(action) {
  try {
    const response = yield call(axios.put, `${API_URL}/${action.payload.id}`, action.payload);
    yield put(updateTodoSuccess(response.data));
  } catch (error) {
    yield put(fetchTodosFailure(error.message));
  }
}

// Watcher Saga
export default function* todoSaga() {
  yield takeLatest('todos/fetchTodosRequest', fetchTodosSaga);
  yield takeLatest('todos/addTodoRequest', addTodoSaga);
  yield takeLatest('todos/deleteTodoRequest', deleteTodoSaga);
  yield takeLatest('todos/updateTodoRequest', updateTodoSaga);
}
