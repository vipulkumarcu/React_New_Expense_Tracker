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

      return [ true, data.idToken ] ; // Indicates success and returns tokenID after login/signup is completed successfully
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

  // Function to send verification email
  async function emailVerificationHandler ( token )
  {
    let url = "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAY0t64QOJOikMKYIQ9nYgx4GsZ4cOgoRA";

    try
    {
      let response = await fetch ( url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify (
            {
              requestType: "VERIFY_EMAIL",
              idToken: token,
            }
          ),
        }
      )
      const data = await response.json ();

      if ( !response.ok )
      {
        throw new Error ( data.error.message || "Email verification failed" );
      }

      handleAlertMessages ( "Email sent for verification. Verification status will change in your next session", "success" );
      return true;
    }

    catch ( error )
    {
      handleAlertMessages ( error.message || "Email verification failed", "danger" );
      return false;
    }
  }

  // Function to check the emai verification status
  async function emailVerified ( token, buttonClicked )
  {
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAY0t64QOJOikMKYIQ9nYgx4GsZ4cOgoRA";
  
    try {
      const response = await fetch ( url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify (
            {
              idToken: token,
            }
          ),
        }
      );
  
      const data = await response.json ();
  
      if ( !response.ok )
      {
        throw new Error ( data.error.message || "Failed to check email verification status." );
      }

      // Ensuring that the data exists
      if ( !data.users || !data.users[0] )
      {
        throw new Error("User data unavailable.");
      }
  
      const emailVerified = data.users[0].emailVerified;

      if ( buttonClicked )
      {
        if ( emailVerified )
        {
          handleAlertMessages ( "Your email is verified!", "success" );
        }
        
        else
        {
          handleAlertMessages ( "Your email is not verified yet.", "warning" );
        }
      }
  
      return emailVerified;
    }
    
    catch ( error )
    {
      handleAlertMessages ( error.message || "Error checking email verification status.", "danger" );
      return false;
    }
  }

  // function to send password reset link on the user's email
  async function changePasswordHandler ( email )
  {
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAY0t64QOJOikMKYIQ9nYgx4GsZ4cOgoRA";

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
              requestType: "PASSWORD_RESET",
              email: email,
            }
          ),
        }
      );

      const data = await response.json ();

      if ( !response.ok )
      {
        throw new Error ( data.error.message || "Failed to change password." );
      }

      return true; // Success, the email has been sent
    }

    catch ( error )
    {
      handleAlertMessages ( error.message || "Failed to change password.", "danger" );
      return false; // Failure, password change request failed
    }
  }

  const expenseContext = {
    isValid,
    errorMessage,
    errorType,
    setIsValid,
    authenticationHandler,
    emailVerificationHandler,
    emailVerified,
    changePasswordHandler,
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