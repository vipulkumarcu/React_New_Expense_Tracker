import { render, screen } from "@testing-library/react";
import ChangePassword from "./ChangePassword";

test ( "renders Text From Change Password",
  () => {
    //Arrange
    render ( <ChangePassword /> );

    //Act
    //Nothing...

    // Assert
    const helloWorldElement = screen.getByText ( "Loading", { exact: false } );
    expect ( helloWorldElement ).toBeInTheDocument ();
  }
);