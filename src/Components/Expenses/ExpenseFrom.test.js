import { render, screen } from "@testing-library/react";
import ExpenseForm from "./ExpenseForm";



test ( "renders Text From Expense Table",
  () => {
    //Arrange
    render ( <ExpenseForm /> );

    //Act
    //Nothing...

    // Assert
    const helloWorldElement = screen.getByText ( "Close", { exact: false } );
    expect ( helloWorldElement ).toBeInTheDocument ();
  }
);