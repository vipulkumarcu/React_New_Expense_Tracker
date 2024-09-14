import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Header from './Components/Body/Header';

function AppRoutes ()
{
  return (
    <Router>

      <Routes>
        <Route path = "/" element = { <App /> } />
        <Route path = "/header" element = { <Header /> } />
        <Route path = "*" element = { <Header /> } />
      </Routes>

    </Router>
  );
}

export default AppRoutes;
