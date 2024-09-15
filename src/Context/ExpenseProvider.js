import { useState } from "react";
import ExpenseContext from "./expense-context";

function ExpenseProvider ( props )
{ 
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

      return [ true, data.idToken ] ; // Indicates success and returns tokenID after login is completed successfully
    }

    catch ( error )
    {
      handleAlertMessages ( error.message || "Authentication failed", "danger" );
      return [ false, null ]; // Indicates failure
    }
  }

  // Function to clear the success/error message after 3 seconds
  function clearMessageAfterDelay ()
  {
    setTimeout (
      () => {
        setIsValid ( false );
        setErrorMessage ( "" );
        setErrorType ( "" );
      }, 3000
    );
  }

  // Function to handle and display errors
  function handleAlertMessages ( message, type )
  {
    // Changing states for alert messages
    setIsValid ( true );
    setErrorMessage ( message );
    setErrorType ( type );

    // Clearing alerts after 3 seconds
    clearMessageAfterDelay ();
  };

  const expenseContext = {
    isValid,
    errorMessage,
    errorType,
    setIsValid,
    // setErrorMessage,
    // setErrorType,
    authenticationHandler,
    clearMessageAfterDelay,
    handleAlertMessages,
  };

  return (
    <ExpenseContext.Provider value = { expenseContext }>
      { props.children }
    </ExpenseContext.Provider>
  )
}

export default ExpenseProvider;