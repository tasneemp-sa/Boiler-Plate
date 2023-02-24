
import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from '../reducers/index.js';

export const store = configureStore({
  reducer: {
    auth: authSliceReducer
  }
}
);

export default store;