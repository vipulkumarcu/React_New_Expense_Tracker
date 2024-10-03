import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './AppRoutes';
import ExpenseProvider from './Context/ExpenseProvider';
import { Provider } from 'react-redux';
import store from './Store/store'; // Adjust the path as necessary

const root = ReactDOM.createRoot ( document.getElementById ( 'root' ) );

root.render (
  <Provider store = { store } > {/* Wrap your application with Redux Provider */}
    <ExpenseProvider>
      <AppRoutes />
    </ExpenseProvider>
  </Provider>
);