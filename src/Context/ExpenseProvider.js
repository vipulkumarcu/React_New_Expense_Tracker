import { useEffect, useState } from "react";
import ExpenseContext from "./expense-context";

function ExpenseProvider ( props )
{ 
  const [ expenses, setExpenses ] = useState ( [] );
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

  // Function to fetch previous user details
  async function fetchUserData ( loginToken )
  {
    try
    {
      const url = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAY0t64QOJOikMKYIQ9nYgx4GsZ4cOgoRA"

      const response = await fetch ( url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify (
            {
              idToken: loginToken,
            }
          ),
        }
      );

      const data = await response.json ();

      if ( !response.ok )
      {
        throw new Error ( data.error.message || "Failed to load data." );
      }

      return [ data.users[0].displayName, data.users[0].photoUrl ];
    }

    catch ( error )
    {
      handleAlertMessages ( error.message || "Failed to load data.", "danger" );
      return [ "", "" ];
    }
  }

  // Function to update the user details
  async function updateUserData ( loginToken, fullName, profilePictureURL )
  {
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAY0t64QOJOikMKYIQ9nYgx4GsZ4cOgoRA"

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
              idToken: loginToken,
              displayName: fullName,
              photoUrl: profilePictureURL,
              returnSecureToken: true,
            }
          ),
        }
      );

      const data = await response.json ();

      if ( !response.ok )
      {
        throw new Error ( data.error.message || "Failed to update profile." );
      }

      localStorage.setItem ( "Token", data.idToken );

      return true;
    }

    catch ( error )
    {
      handleAlertMessages ( error.message || "Failed to update profile.", "danger" );
      return true;

    }
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

  async function addExpense ( expense )
  {
    const url = "https://new-expense-tracker-63df8-default-rtdb.firebaseio.com/expenses.json";
  
    try
    {
      const response = await fetch ( url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify ( expense ),
        }
      );
  
      if ( !response.ok )
      {
        throw new Error ( "Failed to add data." );
      }
  
      const data = await response.json ();  // Await response.json() to correctly get the response body
  
      console.log ( data );
  
      // If the data is successfully added to Firebase, now update the local state
      setExpenses ( ( previousExpense ) => [ ...previousExpense, { ...expense, id: data.name } ] );
  
      handleAlertMessages ( "Data Added Successfully.", "success" );
  
    }
    
    catch ( error )
    {
      handleAlertMessages ( error.message || "Failed to add data.", "danger" );
    }
  }

  async function fetchExpense ()
  {
    const url = "https://new-expense-tracker-63df8-default-rtdb.firebaseio.com/expenses.json";
  
    try
    {
      const response = await fetch ( url );
  
      if ( !response.ok )
      {
        throw new Error ( "Failed to fetch expenses." );
      }
  
      const data = await response.json ();  // Await response.json() to correctly get the response body
  
      // Convert fetched data (object) into an array and update state
      const loadedExpenses = [];
  
      for ( const key in data )
      {
        loadedExpenses.push (
          {
            id: key,              // Firebase uses unique keys as ids
            ...data[key],         // Spread the rest of the expense properties
          }
        );
      }
  
      // Update the expenses state
      setExpenses ( loadedExpenses );
  
      handleAlertMessages ( "Expenses fetched successfully.", "success" );
  
    }
    
    catch ( error )
    {
      handleAlertMessages ( error.message || "Failed to fetch expenses.", "danger" );
    }
  }
  
  useEffect (
    () => {
      fetchExpense();
    }, []
  );
  
  
  function removeExpense ( id )
  {
    setExpenses ( previousExpense => previousExpense.filter ( ( expense ) => expense.id !== id ) );
  }

  const expenseContext = {
    expenses,
    isValid,
    errorMessage,
    errorType,
    addExpense,
    removeExpense,
    setIsValid,
    authenticationHandler,
    fetchUserData,
    updateUserData,
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