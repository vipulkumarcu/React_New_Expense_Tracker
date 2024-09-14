import { useContext, useState } from "react";
import { Alert, Button, Card, CardBody, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import ExpenseContext from "../../Context/expense-context";

function SignUp ( { onTogglerClick } )
{
  const [ email, setEmail ] = useState ( "" );
  const [ password, setPassword ] = useState ( "" );
  const [ confirmPassword, setConfirmPassword ] = useState ( "" );
  
  const {
    authenticationHandler,
    isValid,
    errorMessage,
    errorType, setIsValid,
    setErrorMessage,
    setErrorType,
    clearMessageAfterDelay 
  } = useContext ( ExpenseContext );

  async function formSubmitHandler ( event )
  {
    event.preventDefault ();

    // Validate if fields are empty
    if ( !email || !password || !confirmPassword )
    {
      // Changing states for alert messages
      setIsValid ( true );
      setErrorMessage ( "Please fill up all the fields" );
      setErrorType ( "danger" );

      // Clear success message after 3 seconds
      clearMessageAfterDelay ();

      return;
    }

    // Validate if passwords match
    if ( password !== confirmPassword )
    {
      // Changing states for alert messages
      setIsValid ( true );
      setErrorMessage ( "Passwords do not match" );
      setErrorType ( "danger" );

      // Clear success message after 3 seconds
      clearMessageAfterDelay ();

      return;
    }

    // Call authentication handler and wait for response
    const signupSuccess = await authenticationHandler ( email, password, false ); // false means signup

    // Runs only after Signup is Successful
    if ( signupSuccess )
    {
      // Changing states for alert messages
      setIsValid ( true );
      setErrorMessage ( "Signup Successful" );
      setErrorType ( "success" );

      // Clear success message after 3 seconds
      clearMessageAfterDelay ();

      // Reset form after success
      setEmail ( "" );
      setPassword ( "" );
      setConfirmPassword ( "" );     
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