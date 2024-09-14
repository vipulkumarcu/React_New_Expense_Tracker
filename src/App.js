import { Col, Container, Row } from "react-bootstrap";
import SignUp from "./Components/Authentication/SignUp";
import { useState } from "react";
import Login from "./Components/Authentication/Login";

function App ()
{
  const [ userIsLoggedIn, setuserIsLoggedIn ] = useState ( false );

  function authenticationToggler ()
  {
    setuserIsLoggedIn ( previousState => !previousState );
  }

  return (
    <Container fluid style = { { textAlign: "center", padding: "3px" } } >

      <Row className = "m-3 justify-content-center align-items-center" >
        <Col xs = { 4 } md = { 6 } lg = { 4 } >
          { userIsLoggedIn ? <Login onTogglerClick = { authenticationToggler } /> : <SignUp onTogglerClick = { authenticationToggler } /> }
        </Col>
      </Row>

    </Container>
  );
}

export default App;
