import { useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ExpenseContext from "../../Context/expense-context";

function Header ()
{
  const token = localStorage.getItem ( "Token" );
  const { emailVerificationHandler, emailVerified, isValid, setIsValid, errorMessage, errorType } = useContext ( ExpenseContext );
  const [ isEmailVerified, setIsEmailVerified ] = useState ( false );

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

  useEffect (
    () => {
      verifyEmail ( false );
    }, []
  );

  return (
    <Container style = { { margin: 0, padding: 0 } } >

      <Row>
        <Col>
          <em> Welcome To Expense Tracker !!! </em>
        </Col>

        <Col>
          { !isEmailVerified && <Button variant = "warning" onClick = { () => verifyEmail ( true ) } > Verify Email </Button> }
        </Col>

        <Col>
          <p> Your profile is incomplete. <Link to = "/update" > Complete now. </Link> </p>
        </Col>
      </Row>
      
      <hr />

      <Row>
        <Col>
        { isValid && <Alert variant = { errorType } onClose = { () => setIsValid ( false ) } dismissible > { errorMessage } </Alert> }
        </Col>
      </Row>

    </Container>
  )
}

export default Header;