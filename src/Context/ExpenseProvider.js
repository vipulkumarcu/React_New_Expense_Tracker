/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import ExpenseContext from "./expense-context";

function ExpenseProvider ( props )
{ 

  // Local state for storing expenses
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

      return [ true, data.idToken, data.email ] ; // Indicates success and returns tokenID and email after login/signup is completed successfully
    }

    catch ( error )
    {
      handleAlertMessages ( error.message || "Authentication failed", "danger" );
      return [ false, null, null ]; // Indicates failure
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

  // Function to add an expense
  async function addExpense ( expense )
  {
    const email = localStorage.getItem ( "Email" || null );
    const url = "https://new-expense-tracker-63df8-default-rtdb.firebaseio.com/expenses.json";
  
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
              userEmail: email,
              expenses: expense
            }
          ),
        }
      );
  
      if ( !response.ok )
      {
        throw new Error ( "Failed to add data." );
      }
  
      const data = await response.json ();  // Await response.json() to correctly get the response body
  
      // If the data is successfully added to Firebase, now update the local state
      setExpenses ( ( previousExpense ) => [ ...previousExpense, { ...expense, id: data.name } ] );
  
      handleAlertMessages ( "Data Added Successfully.", "success" );
    }
    
    catch ( error )
    {
      handleAlertMessages ( error.message || "Failed to add data.", "danger" );
    }
  }

  // Function to fetch expenses from the database
  async function fetchExpense ()
  {
    const userEmailToFilter = localStorage.getItem ( "Email" || null );
    const url = "https://new-expense-tracker-63df8-default-rtdb.firebaseio.com/expenses.json";
  
    try
    {
      const response = await fetch ( url );
  
      if ( !response.ok )
      {
        throw new Error ( "Failed to fetch expenses." );
      }
  
      const data = await response.json ();  // Await response.json() to correctly get the response body    

      if ( data )
      {
        // Convert the object into an array and filter by userEmail
        const filteredExpenses = Object.entries ( data )
        .filter ( ( [_, value] ) => value.userEmail === userEmailToFilter )
        .map ( ( [ key, value ] ) => ( { id: key, ...value.expenses, } ) );

        if ( filteredExpenses.length > 0 )
        {
          // Remove the expenses from the filtered array and set it in expenses
          setExpenses ( filteredExpenses );
          handleAlertMessages ( "Expenses fetched successfully.", "success" );
        }

        else
        {
          setExpenses ( [] );
          handleAlertMessages ( "No Expenses Found.", "warning" );
        }

      }

      else
      {
        setExpenses ( [] );
        handleAlertMessages ( "No Expenses Found.", "warning" );

      }
  
    }
    
    catch ( error )
    {
      handleAlertMessages ( error.message || "Failed to fetch expenses.", "danger" );
    }
  }

  // Function to remove an expense
  async function removeExpense ( id )
  {
    const url = `https://new-expense-tracker-63df8-default-rtdb.firebaseio.com/expenses/${id}.json`;
  
    try {
      const response = await fetch ( url,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if ( !response.ok )
      {
        throw new Error("Failed to delete data.");
      }
  
      // If the expense is successfully deleted, now update the local state
      setExpenses ( ( previousExpenses ) => previousExpenses.filter ( ( expense ) => expense.id !== id ) );
  
      handleAlertMessages("Expense Deleted Successfully.", "success");
    }
    
    catch ( error )
    {
      handleAlertMessages ( error.message || "Failed to delete expense.", "danger" );
    }
  }  
  
  // Function to update an expense
  async function updateExpense ( id, updatedExpense )
  {
    const email = localStorage.getItem ( "Email" || null );
    const url = `https://new-expense-tracker-63df8-default-rtdb.firebaseio.com/expenses/${id}.json`;
  
    try {
      const response = await fetch ( url,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify (
            {
              userEmail: email,
              expenses: updatedExpense,
            }
          ),
        }
      );
  
      if ( !response.ok )
      {
        throw new Error ( "Failed to update expense." );
      }
  
      const data = await response.json (); // Await the response to check if it's successful
  
      // Update the local state with the updated expense
      setExpenses ( ( previousExpenses ) => previousExpenses.map ( ( expense ) => expense.id === id ? { ...expense, ...updatedExpense } : expense ) );
  
      handleAlertMessages ( "Expense Updated Successfully.", "success" );
    }
    
    catch ( error )
    {
      handleAlertMessages ( error.message || "Failed to update expense.", "danger" );
    }
  }
  

  const expenseContext = {
    expenses,
    isValid,
    errorMessage,
    errorType,
    setExpenses,
    addExpense,
    updateExpense,
    removeExpense,
    fetchExpense,
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