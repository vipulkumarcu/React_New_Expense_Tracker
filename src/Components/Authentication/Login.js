import { useContext, useState } from "react";
import { Alert, Button, Card, CardBody, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ExpenseContext from "../../Context/expense-context";

function Login ()
{
  const navigateToLandingPage = useNavigate ();
  const navigateToSignupPage = useNavigate ();

  const [ email, setEmail ] = useState ( "" );
  const [ password, setPassword ] = useState ( "" );

  localStorage.removeItem ( "Token" );
  
  const {
    authenticationHandler,
    isValid,
    errorMessage,
    errorType,
    setIsValid,
    handleAlertMessages, 
  } = useContext ( ExpenseContext );

  async function formSubmitHandler ( event )
  {
    event.preventDefault ();

    // Validate if fields are empty and display appropriate message
    if ( !email || !password )
    {
      handleAlertMessages ( "Please fill up all the fields", "danger" );
      return;
    }

    const [ loginSuccess, token ] = await authenticationHandler ( email, password, true ); // true for login  
    
    // Runs only after Login is Successful
    if ( loginSuccess )
    {
      // Reset form, store the token and navigate only on success
      setEmail ( "" );
      setPassword ( "" );
      localStorage.setItem ( "Token", token );
      navigateToLandingPage ( "/landing-page" );
    }
  };

  function togglePage ()
  {
    navigateToSignupPage ( "/signup" );
  }

  return (
    <Container fluid style = { { textAlign: "center", padding: "3px" } } >

      <Row className = "m-3 justify-content-center align-items-center" >

        <Col xs = { 4 } md = { 6 } lg = { 4 } >

          {/* { isValid && <Alert variant = { errorType } onClose = { () => setIsValid ( false ) } dismissible > { errorMessage } </Alert> } */}

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

                <Button variant = "primary" className = "m-3 p-2" style = { { height: "50px", width: "350px", borderRadius: "45px" } } type = "submit" > Login </Button>

              </Form>

              <a href = "/change-password" > Forgot Password ? Click Here </a>

            </CardBody>

          </Card>

          <Button variant = "dark" className = "m-3 p-3" onClick = { togglePage } > Don't Have an Account ? SignUp </Button>

        </Col>

      </Row>

    </Container>
  )
}

export default Login;