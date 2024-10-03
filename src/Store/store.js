import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from "./expenses"; // Adjust the path accordingly
import authReducer from "./authenticate"; // Assuming you have an auth slice
import alertReducer from "./alert"; // Assuming you have an alert slice

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    auth: authReducer,
    alert: alertReducer,
  },
});

export default store;