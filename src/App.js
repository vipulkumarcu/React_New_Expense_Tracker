import SignUp from "./Components/Authentication/SignUp";
import { useState } from "react";
import Login from "./Components/Authentication/Login";

function App ()
{
  const [ userIsLoggedIn, setuserIsLoggedIn ] = useState ( false );

  function authenticationToggler ()
  {
    setuserIsLoggedIn ( previousState => !previousState );
  }

  return (
    <>
      { userIsLoggedIn ? <Login onTogglerClick = { authenticationToggler } /> : <SignUp onTogglerClick = { authenticationToggler } /> }
    </>
  );
}

export default App;