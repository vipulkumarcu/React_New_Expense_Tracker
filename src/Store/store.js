import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from "./expenses";
import authReducer from "./authenticate";
import alertReducer from "./alert";
import themeReducer from "./theme";

const store = configureStore (
  {
    reducer: {
      expenses: expensesReducer,
      auth: authReducer,
      alert: alertReducer,
      theme: themeReducer,
    },
  }
);

export default store;