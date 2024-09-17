import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import SignUp from './Components/Authentication/SignUp';
import Login from './Components/Authentication/Login';
import Update from './Components/Authentication/Update';
import Layout from './Layout';
import Landingpage from './Components/Body/Landingpage';

function AppRoutes ()
{
  return (
    <Router>

      <Routes>

        {/* All routes will be wrapped inside the Layout to keep the header constant */}

        <Route path = "/" element = { <Layout />}>
          <Route index element = { <App /> } />
          <Route path = "signup" element = { <SignUp /> } />
          <Route path = "login" element = { <Login /> } />
          <Route path = "update" element = { <Update /> } />
          <Route path = "landing-page" element = { <Landingpage /> } />
          <Route path = "*" element = { <App /> } />
        </Route>
        
        {/* Fallback route */}

      </Routes>

    </Router>
  );
}

export default AppRoutes;