import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Header from './Components/Body/Header';
import SignUp from './Components/Authentication/SignUp';
import Login from './Components/Authentication/Login';
import Update from './Components/Authentication/Update';

function AppRoutes ()
{
  return (
    <Router>

      <Routes>
        <Route path = "/" element = { <App /> } />
        <Route path = "/signup" element = { <SignUp /> } />
        <Route path = "/login" element = { <Login /> } />
        <Route path = "/update" element = { <Update /> } />
        <Route path = "/header" element = { <Header /> } />
        <Route path = "*" element = { <App /> } />
      </Routes>

    </Router>
  );
}

export default AppRoutes;