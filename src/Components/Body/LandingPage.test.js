import { render, screen } from "@testing-library/react";
import Landingpage from "./Landingpage";


test ( "renders Text From Landing Page",
  () => {
    //Arrange
    render ( <Landingpage /> );

    //Act
    //Nothing...

    // Assert
    const helloWorldElement = screen.getByText ( "Add Expenses", { exact: false } );
    expect ( helloWorldElement ).toBeInTheDocument ();
  }
);