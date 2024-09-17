import React from "react";

const ExpenseContext = React.createContext (
  {
    token : null,
    expenses: [],
    isValid: false,              // Tracks if the last operation was valid (success/failure)
    errorMessage: "",            // Holds the error or success message to be shown in UI
    errorType: "",               // Type of error (can be "danger" for error, "success" for success)
    addExpense: () => {},        // Function to add an expense
    setExpenses: () => {},        // Function to add an expense
    removeExpense: () => {},        // Function to remove an expense
    updateExpense: () => {},        // Function to update an expense
    fetchExpense: () => {},        // Function to fetch data from firebase
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