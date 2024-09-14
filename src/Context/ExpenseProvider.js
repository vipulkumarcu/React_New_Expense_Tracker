import ExpenseContext from "./expense-context";

function ExpenseProvider ( props )
{
  function authenticationHandler ()
  {}

  const expenseContext = {
    authenticationHandler,
  };

  return (
    <ExpenseContext.Provider value = { expenseContext }>
      { props.children }
    </ExpenseContext.Provider>
  )
}

export default ExpenseProvider;