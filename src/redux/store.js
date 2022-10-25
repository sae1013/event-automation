import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './slices/modalSlice.js';
import {createStore, combineReducers} from 'redux';

export const store = configureStore({
  reducer: {
    modal:modalReducer
  },
})

