/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ExpenseContext from "../../Context/expense-context";

function Header ()
{
  const token = localStorage.getItem ( "Token" )
  const { emailVerificationHandler, setExpenses, fetchExpense, emailVerified, isValid, setIsValid, errorMessage, errorType } = useContext ( ExpenseContext );
  const [ isEmailVerified, setIsEmailVerified ] = useState ( null );
  const [ isUserLoggedIn, setIsUserLoggedIn ] = useState ( false );
  const [ isVerifying, setIsVerifying ] = useState ( true );
  const navigate = useNavigate ();

  // function to check if the email is verified or not
  async function verifyEmail ( buttonClicked )
  {
    let boolean = null;

    if ( buttonClicked )
    {
      boolean = await emailVerificationHandler ( token );
    }
    
    if ( boolean )
    {
      setIsEmailVerified ( true );
      setIsVerifying ( false );
      return;
    }

    else
    {
      const confirmation = await emailVerified ( token, buttonClicked );

      if ( confirmation )
      {
        setIsEmailVerified ( true );
      }

      else
      {
        setIsEmailVerified ( false );
      }

      setIsVerifying ( false );
    }
  }

  // Function to Logout user
  function handleLogout ()
  {
    setExpenses ( [] );
    setIsEmailVerified ( true ); // Changing the email verification boolean to true
    localStorage.removeItem ( "Token" ); // Clearing the token from local storage
    localStorage.removeItem ( "Email" ); // Clearing the email from local storage
    setIsUserLoggedIn ( false ); // Boolean
    navigate ( "/login" ); // Redirecting user to the login page after logout
  };

  useEffect (
    () => {
      if ( token )
      {
        setIsUserLoggedIn ( true );
        verifyEmail ( false );
        fetchExpense ();
      }

      else
      {
        setIsVerifying ( false ); // No token, no need to verify
      }
    }, [ token ]
  );

  return (
    <>

      <Navbar bg = "dark" data-bs-theme = "dark" className = "mb-2">

        <Container fluid className = "m-0" >

          <Navbar.Brand> Welcome To Expense Tracker </Navbar.Brand>
          
          <Nav className = "me-auto">
            <Nav.Link href = "#home"> Home </Nav.Link>
            <Nav.Link href = "#about-us"> About Us </Nav.Link>
          </Nav>

            {
              isUserLoggedIn &&

              (
                <Nav>

                  { !isVerifying && !isEmailVerified && <Button variant = "warning" className = "m-2" onClick = { () => verifyEmail ( true ) } > Verify Email </Button> }

                  <Button variant = "light" onClick = { handleLogout } className = "m-2" > Logout </Button>

                  { !isVerifying && !isEmailVerified && <p style = { { color: "white", margin: "2px" } } > Your profile is incomplete. <Link to = "/update" > Complete now. </Link> </p> }
                  
                </Nav>
              )
                
            }

         </Container>

      </Navbar>

      <Container >
        <Row>
          <Col >
          { isValid && <Alert variant = { errorType } onClose = { () => setIsValid ( false ) } dismissible > { errorMessage } </Alert> }
          </Col>
        </Row>
      </Container>
    
    </>
  )
}

export default Header;