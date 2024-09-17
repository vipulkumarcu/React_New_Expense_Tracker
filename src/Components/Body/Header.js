import { useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ExpenseContext from "../../Context/expense-context";

function Header ()
{
  const token = localStorage.getItem ( "Token" || null );
  const { emailVerificationHandler, emailVerified, isValid, setIsValid, errorMessage, errorType } = useContext ( ExpenseContext );
  const [ isEmailVerified, setIsEmailVerified ] = useState ( false );
  const [ isUserLoggedIn, setIsUserLoggedIn ] = useState ( false );
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
      return;
    }

    else
    {
      const confirmation = await emailVerified ( token, buttonClicked );

      if ( confirmation )
      {
        setIsEmailVerified ( true );
      }
    }
  }

  // Function to Logout user
  function handleLogout ()
  {
    localStorage.removeItem ( "Token" ); // Clearing the token from local storage
    setIsUserLoggedIn ( false ); // Boolean 
    navigate ( "/login" ); // Redirecting user to the login page after logout
  };

  useEffect (
    () => {
      if ( token )
      {
        setIsUserLoggedIn ( true );
        verifyEmail ( false );
      }
    }, [ token ]
  );

  return (
    <>

      <Navbar bg="dark" data-bs-theme="dark">

        <Container style = { { margin: 0} } >

          <Navbar.Brand> Welcome To Expense Tracker </Navbar.Brand>
          
          <Nav className = "me-auto">
            <Nav.Link href = "#home"> Home </Nav.Link>
            <Nav.Link href = "#about-us"> About Us </Nav.Link>
          </Nav>

            {
              isUserLoggedIn &&

              (
                <Nav>
                  { !isEmailVerified && <Button variant = "warning" onClick = { () => verifyEmail ( true ) } > Verify Email </Button> }

                  <Button variant = "light" onClick = { handleLogout } className = "ms-2"> Logout </Button>

                  { !isEmailVerified && <p style = { { color: "white" } } > Your profile is incomplete. <Link to = "/update" > Complete now. </Link> </p> }
                </Nav>
              )
                
            }

         </Container>

      </Navbar>

      <Container className = "m-3" >
        <Row>
          <Col>
          { isValid && <Alert variant = { errorType } onClose = { () => setIsValid ( false ) } dismissible > { errorMessage } </Alert> }
          </Col>
        </Row>
      </Container>
    
    </>
  )
}

export default Header;