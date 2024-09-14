import React from "react";

const ExpenseContext = React.createContext (
  {
    authenticationHandler: () => {},
  }
);

export default ExpenseContext;