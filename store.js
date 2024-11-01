// store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import todoReducer from './todoSlice';
import todoSaga from './todoSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(todoSaga);

export default store;
