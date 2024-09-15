import React from "react";

const ExpenseContext = React.createContext (
  {
    isValid: false,              // Tracks if the last operation was valid (success/failure)
    errorMessage: "",            // Holds the error or success message to be shown in UI
    errorType: "",               // Type of error (can be "danger" for error, "success" for success)
    setIsValid: () => {},        // Function to toggle the validity flag
    // setErrorMessage: () => {},   // Function to set the error message
    // setErrorType: () => {},      // Function to set the error type
    authenticationHandler: () => {},  // Function to handle login/signup (authentication)
    emailVerificationHandler: () => {},  // Function to handle user email verification
    emailVerified: () => {},  // Function to check if the email is verified
    clearMessageAfterDelay: () => {},  // Function to clear alerts after 3 seconds
    handleAlertMessages: () => {},  // Function to display error messages
  }
);

export default ExpenseContext;