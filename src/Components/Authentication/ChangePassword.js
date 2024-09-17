import { useContext, useState } from "react";
import { Alert, Button, Card, CardBody, Col, Container, FloatingLabel, Form, Row, Spinner } from "react-bootstrap";
import ExpenseContext from "../../Context/expense-context";
import { useNavigate } from "react-router-dom";

function ChangePassword ()
{
  const [ email, setEmail ] = useState ( "" );
  const [ isLoading, setLoading ] = useState ( false );
  const [ isValid, setIsValid ] = useState ( false );
  const [ errorMessage, setErrorMessage ] = useState ( "" );
  const [ errorType, setErrorType ] = useState ( "" );

  localStorage.removeItem ( "Token" ); // Clear any existing token

  const navigate = useNavigate ();

  const { changePasswordHandler, clearMessageAfterDelay } = useContext ( ExpenseContext );

  // Function to handle and display errors
  function handleAlertMessages ( message, type )
  {
    // Changing states for alert messages
    setIsValid ( true );
    setErrorMessage ( message );
    setErrorType ( type );

    // Clearing alerts after 3 seconds
    clearMessageAfterDelay ();
  };

  async function formSubmitHandler ( event )
  {
    event.preventDefault ();

    // Validate if field is empty and display appropriate message
    if ( !email )
    {
      handleAlertMessages ( "Please enter your email id", "danger" );
      return;
    }

    setLoading ( true );

    const boolean = await changePasswordHandler ( email );

    if ( boolean )
    {
      setEmail ( "" );
      setLoading ( false );
      handleAlertMessages ( "Email has been sent to reset password", "success" );
    } 
  }

  return (
    <Container fluid style = { { textAlign: "center", padding: "3px" } } >

      <Row className = "m-3 justify-content-center align-items-center" >

        { isValid && <Alert variant = { errorType } onClose = { () => setIsValid ( false ) } dismissible > { errorMessage } </Alert> }

        <Col xs = { 4 } md = { 6 } lg = { 4 } >

          <Card className = "shadow">

            <CardBody style = { { textAlign: "center" } }>

              <Card.Title className = "m-4"> Reset Your Password </Card.Title>

              <Form onSubmit = { formSubmitHandler }>

                <FloatingLabel controlId = "floatingInput" label = "Email address" className = "m-3" >
                  <Form.Control type = "email" placeholder = "Enter Your Email ID" value = { email } onChange = { ( e ) => setEmail ( e.target.value ) } />
                </FloatingLabel>

                <Button variant = "primary" className = "m-3 p-2" style = { { height: "50px", width: "350px", borderRadius: "45px" } } type = "submit" >
                  {
                    !isLoading
                    ? ( "Reset Password" )
                    : ( <Spinner animation = "border" role = "status">
                        <span className = "visually-hidden"> Loading... </span>
                      </Spinner> )
                  }
                </Button>

              </Form>

            </CardBody>

          </Card>

          <Button variant = "info" className = "m-3 p-3" onClick = { () => navigate ( "/login" ) } disabled = { isLoading } > Go To Login </Button>

        </Col>

      </Row>

    </Container>
  )
}

export default ChangePassword;