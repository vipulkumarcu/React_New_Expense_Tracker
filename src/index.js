import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './AppRoutes';
import ExpenseProvider from './Context/ExpenseProvider';
import { Provider } from 'react-redux';
import store from './Store/store';
import "./index.css";

const root = ReactDOM.createRoot ( document.getElementById ( 'root' ) );

root.render (
  <Provider store = { store } >
    <ExpenseProvider>
      <AppRoutes />
    </ExpenseProvider>
  </Provider>
);