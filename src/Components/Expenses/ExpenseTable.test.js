import { render, screen } from "@testing-library/react";
import ExpenseTable from "./ExpenseTable";


test ( "renders Text From Expense Table",
  () => {
    //Arrange
    render ( <ExpenseTable /> );

    //Act
    //Nothing...

    // Assert
    const helloWorldElement = screen.getByText ( "No Expenses Found", { exact: false } );
    expect ( helloWorldElement ).toBeInTheDocument ();
  }
);