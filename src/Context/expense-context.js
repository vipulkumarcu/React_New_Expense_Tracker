import React from "react";

const ExpenseContext = React.createContext (
  {
    loginToken: null,            // Will hold the login token (JWT)
    isValid: false,              // Tracks if the last operation was valid (success/failure)
    errorMessage: "",            // Holds the error or success message to be shown in UI
    errorType: "",               // Type of error (can be "danger" for error, "success" for success)
    setLoginToken: () => {},        // Function to toggle the validity flag
    setIsValid: () => {},        // Function to toggle the validity flag
    setErrorMessage: () => {},   // Function to set the error message
    setErrorType: () => {},      // Function to set the error type
    authenticationHandler: () => {},  // Function to handle login/signup (authentication)
    clearMessageAfterDelay: () => {},  // Function to clear alerts after 3 seconds
  }
);

export default ExpenseContext;