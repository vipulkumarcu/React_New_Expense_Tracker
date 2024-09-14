import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './AppRoutes';
import ExpenseProvider from './Context/ExpenseProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ExpenseProvider>
    <AppRoutes />
  </ExpenseProvider>
);