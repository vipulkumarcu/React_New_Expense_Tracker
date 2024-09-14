import { useState } from "react";
import { Alert, Button, Card, CardBody, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";

function SignUp ( { onTogglerClick } )
{
  const [ email, setEmail ] = useState ( "" );
  const [ password, setPassword ] = useState ( "" );
  const [ confirmPassword, setConfirmPassword ] = useState ( "" );
  const [ isValid, setIsValid ] = useState ( false );
  const [ errorMessage, setErrorMessage ] = useState ( "" );
  const [ errorType, setErrorType ] = useState ( "" );

  const apiUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAY0t64QOJOikMKYIQ9nYgx4GsZ4cOgoRA";

  async function formSubmitHandler ( event )
  {
    event.preventDefault ();

    // Validate if fields are empty
    if ( !email || !password || !confirmPassword )
    {
      setIsValid ( true );
      setErrorMessage ( "Please fill up all the fields" );
      setErrorType ( "danger" );
      return;
    }

    // Validate if passwords match
    if ( password !== confirmPassword )
    {
      setIsValid ( true );
      setErrorMessage ( "Passwords do not match" );
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
        // Handle errors from Firebase API (like email already exists or weak password)
        throw new Error ( data.error.message || "Signup failed" );
      }

      setIsValid ( true );
      setErrorMessage ( "Signup Successful" );
      setErrorType ( "success" );

      console.log ( "User has successfully signed up" );

      // Reset form after success
      setEmail ( "" );
      setPassword ( "" );
      setConfirmPassword ( "" );
    }
    
    catch ( error )
    {
      // Handle any errors during signup
      const message = error.message || "Signup failed";
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

              <Card.Title className = "m-4"> Sign Up </Card.Title>

              <Form onSubmit = { formSubmitHandler }>

                <FloatingLabel controlId = "floatingInput" label = "Email address" className = "m-3" >
                  <Form.Control type = "email" placeholder = "Enter Your Email ID" value = { email } onChange = { ( e ) => setEmail ( e.target.value ) } />
                </FloatingLabel>

                <FloatingLabel controlId = "floatingPassword" label = "Password" className = "m-3" >
                  <Form.Control type = "password" placeholder = "Enter Your Password" value = { password } onChange = { ( e ) => setPassword ( e.target.value ) } />
                </FloatingLabel>

                <FloatingLabel controlId = "floatingConfirmPassword" label = "Confirm Password" className = "m-3" >
                  <Form.Control type = "password" placeholder = "Enter Your Password Again" value = { confirmPassword } onChange = { ( e ) => setConfirmPassword ( e.target.value ) } />
                </FloatingLabel>

                <Button variant = "primary" className = "m-3 p-3" type = "submit" > SignUp </Button>

              </Form>

            </CardBody>

          </Card>

          <Button variant = "success" className = "m-3 p-3" onClick = { onTogglerClick }> Have an Account ? Login </Button>

        </Col>

      </Row>

    </Container>
  )
}

export default SignUp;