import { render, screen } from "@testing-library/react";
import Header from "./Header";


test ( "renders Text From Header",
  () => {
    //Arrange
    render ( <Header /> );

    //Act
    //Nothing...

    // Assert
    const helloWorldElement = screen.getByText ( "Welcome To Expense Tracker", { exact: false } );
    expect ( helloWorldElement ).toBeInTheDocument ();
  }
);