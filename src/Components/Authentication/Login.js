import { useState } from "react";
import { Alert, Button, Card, CardBody, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login ( { onTogglerClick } )
{
  const [ email, setEmail ] = useState ( "" );
  const [ password, setPassword ] = useState ( "" );
  const [ isValid, setIsValid ] = useState ( false );
  const [ errorMessage, setErrorMessage ] = useState ( "" );
  const [ errorType, setErrorType ] = useState ( "" );

  const navigate = useNavigate ();

  const apiUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAY0t64QOJOikMKYIQ9nYgx4GsZ4cOgoRA";

  async function formSubmitHandler ( event )
  {
    event.preventDefault ();

    // Validate if fields are empty
    if ( !email || !password )
    {
      setIsValid ( true );
      setErrorMessage ( "Please fill up all the fields" );
      setErrorType ( "danger" );
      return;
    }
    
    // Make a request to the Firebase API for signing up the user using fetch
    try
    {
      const response = await fetch ( apiUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify (
            {
              email: email,
              password: password,
              returnSecureToken: true,
            }
          ),
        }
      );

      const data = await response.json ();

      if ( !response.ok )
      {
        throw new Error ( data.error.message || "Login failed" );
      }

      setIsValid ( true );
      setErrorMessage ( "Login Successful" );
      setErrorType ( "success" );

      // Token  from the firebase
      console.log ( "User logged in:", data.idToken );

      // Reset form after success
      setEmail ( "" );
      setPassword ( "" );

     navigate ( "/header" );
    }
    
    catch ( error )
    {
      const message = error.message || "Login failed";
      setIsValid ( true );
      setErrorMessage ( message );
      setErrorType ( "danger" );
    }
  }

  return (
    <Container fluid style = { { textAlign: "center", padding: "3px" } } >

      <Row className = "m-3 justify-content-center align-items-center" >

        <Col xs = { 4 } md = { 6 } lg = { 4 } >

          { isValid && <Alert variant = { errorType } onClose = { () => setIsValid ( false ) } dismissible > { errorMessage } </Alert> }

          <Card className = "shadow">

            <CardBody style = { { textAlign: "center" } }>

              <Card.Title className = "m-4"> Login </Card.Title>

              <Form onSubmit = { formSubmitHandler }>

                <FloatingLabel controlId = "floatingInput" label = "Email address" className = "m-3" >
                  <Form.Control type = "email" placeholder = "Enter Your Email ID" value = { email } onChange = { ( e ) => setEmail ( e.target.value ) } />
                </FloatingLabel>

                <FloatingLabel controlId = "floatingPassword" label = "Password" className = "m-3" >
                  <Form.Control type = "password" placeholder = "Enter Your Password" value = { password } onChange = { ( e ) => setPassword ( e.target.value ) } />
                </FloatingLabel>

                <Button variant = "primary" className = "m-3 p-3" type = "submit" > Login </Button>

              </Form>

              <a href = "#"> Forgot Password ? Click Here </a>

            </CardBody>

          </Card>

          <Button variant = "dark" className = "m-3 p-3" onClick = { onTogglerClick } > Don't Have an Account ? SignUp </Button>

        </Col>

      </Row>

    </Container>
  )
}

export default Login;