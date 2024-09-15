import { useState } from "react";
import ExpenseContext from "./expense-context";

function ExpenseProvider ( props )
{
  // State for checking if the user is loggedin or not
  const [ loginToken, setLoginToken ] = useState ( null );
  
  // States for alert
  const [ isValid, setIsValid ] = useState ( false );
  const [ errorMessage, setErrorMessage ] = useState ( "" );
  const [ errorType, setErrorType ] = useState ( "" );

  // Function to authenticate user (Signup/Login)
  async function authenticationHandler ( email, password, isLogin )
  {
    let url = isLogin
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAY0t64QOJOikMKYIQ9nYgx4GsZ4cOgoRA"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAY0t64QOJOikMKYIQ9nYgx4GsZ4cOgoRA";

    try
    {
      const response = await fetch ( url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify (
            {
              email: email,
              password: password,
              returnSecureToken: true,
            }
          ),
        }
      );

      const data = await response.json ();

      if ( !response.ok )
      {
        throw new Error ( data.error.message || "Authentication failed" );
      }

      setLoginToken ( data.idToken );
      return true; // Indicates success
    }

    catch ( error )
    {
      setIsValid ( true );
      setErrorMessage ( error.message || "Authentication failed" );
      setErrorType ( "danger" );

      clearMessageAfterDelay ();

      return false; // Indicates failure
    }
  }

  // Function to clear the success/error message after 2 seconds
  function clearMessageAfterDelay ()
  {
    setTimeout (
      () => {
        setIsValid ( false );
        setErrorMessage ( "" );
        setErrorType ( "" );
      }, 2000
    );
  }

  const expenseContext = {
    loginToken,
    isValid,
    errorMessage,
    errorType,
    setLoginToken,
    setIsValid,
    setErrorMessage,
    setErrorType,
    authenticationHandler,
    clearMessageAfterDelay,
  };

  return (
    <ExpenseContext.Provider value = { expenseContext }>
      { props.children }
    </ExpenseContext.Provider>
  )
}

export default ExpenseProvider;