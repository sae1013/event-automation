import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice.js';
import {createStore, combineReducers} from 'redux';

export const store = configureStore({
  reducer: {
    counter:counterReducer
  },
})