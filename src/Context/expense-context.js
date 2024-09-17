import React from "react";

const ExpenseContext = React.createContext (
  {
    expenses: [],
    isValid: false,              // Tracks if the last operation was valid (success/failure)
    errorMessage: "",            // Holds the error or success message to be shown in UI
    errorType: "",               // Type of error (can be "danger" for error, "success" for success)
    addExpenses: () => {},        // Function to add an expense
    removeExpenses: () => {},        // Function to remove an expense
    setIsValid: () => {},        // Function to toggle the validity flag
    authenticationHandler: () => {},  // Function to handle login/signup (authentication)
    fetchUserData: () => {},  // Function to fetch previous user details
    updateUserData: () => {},  // Function to update the user details
    emailVerificationHandler: () => {},  // Function to handle user email verification
    changePasswordHandler: () => {},  // Function to reset password
    emailVerified: () => {},  // Function to check if the email is verified
    clearMessageAfterDelay: () => {},  // Function to clear alerts after 3 seconds
    handleAlertMessages: () => {},  // Function to display error messages
  }
);

export default ExpenseContext;