import { useContext, useEffect, useState } from "react";
import { Alert, Button, Card, CardBody, Col, Container, Form, Row } from "react-bootstrap";
import ExpenseContext from "../../Context/expense-context";
import { useNavigate } from "react-router-dom";

function Update ()
{
  const {
    isValid,
    errorMessage,
    errorType,
    fetchUserData,
    updateUserData,
    setIsValid,
    handleAlertMessages,
  } = useContext ( ExpenseContext );

  const [ fullName, setFullName ] = useState ( "" );
  const [ profilePictureURL, setProfilePictureURL ] = useState ( "" );
  const loginToken = ( localStorage.getItem ( "Token" ) || "" ) ;

  const navigate = useNavigate ();

  useEffect (
    () => {
      async function loadData ()
      {
        if ( loginToken )
        {
          const [ displayName, photoUrl ] = await fetchUserData ( loginToken );
          setFullName ( displayName || "" );
          setProfilePictureURL (photoUrl || "" );
        }
      }

      loadData ();
          
    }, [ loginToken, fetchUserData ]
  );

  async function formSubmitHandler ( event )
  {
    event.preventDefault ();

    // Validate if fields are empty
    if ( !fullName || !profilePictureURL )
    {
      handleAlertMessages ( "Please fill up all the fields", "danger" );
      return;
    }

    const boolean = await updateUserData ( loginToken, fullName, profilePictureURL );

    if ( boolean )
    {
      handleAlertMessages ( "Profile Updated Successfully", "success" );

      // Reset form after success
      setFullName ( "" );
      setProfilePictureURL ( "" );
    }
  }

  return (
    <Container fluid style = { { textAlign: "center", padding: "3px" } } >

      <Row className = "m-3 justify-content-center align-items-center" >

        <Col xs = { 4 } md = { 6 } lg = { 4 } >

          { isValid && <Alert variant = { errorType } onClose = { () => setIsValid ( false ) } dismissible > { errorMessage } </Alert> }

          <Card className = "shadow">

            <Card.Title className = "m-4"> Update User Details </Card.Title>

            <CardBody style = { { textAlign: "center" } }>

              <Form onSubmit = { formSubmitHandler }>

                <Form.Group className = "mb-3" controlId = "fullName">
                  <Form.Label> Full Name : </Form.Label>
                  <Form.Control type = "text" placeholder = "Enter Your Full Name" value = { fullName } onChange = { ( e ) => setFullName ( e.target.value ) } />
                </Form.Group>

                <Form.Group className = "mb-3" controlId = "profilePicture">
                  <Form.Label> Profile URL : </Form.Label>
                  <Form.Control type = "text" placeholder = "Enter Your Profile URL" value = { profilePictureURL } onChange = { ( e ) => setProfilePictureURL ( e.target.value ) } />
                </Form.Group>

                <Button variant = "primary" type = "submit" > Update </Button>

                <Button variant = "secondary" className = "m-2" onClick = { () => navigate ( "/header" ) } > Cancel </Button>

              </Form>

            </CardBody>

          </Card>

        </Col>

      </Row>

    </Container>
  )
}

export default Update;