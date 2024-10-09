import { render, screen } from "@testing-library/react";
import Update from "./Update";

test ( "renders Text From Update",
  () => {
    //Arrange
    render ( <Update /> );

    //Act
    //Nothing...

    // Assert
    const helloWorldElement = screen.getByText ( "Update", { exact: false } );
    expect ( helloWorldElement ).toBeInTheDocument ();
  }
);