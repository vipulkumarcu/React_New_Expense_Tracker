import { Col, Container, Row } from "react-bootstrap";
import SignUp from "./Components/Authentication/SignUp";

function App ()
{
  return (
    <Container fluid style = { { textAlign: "center", padding: "3px" } } >

      <Row className = "m-3" >
        <h1> Expense Tracker </h1>
      </Row>

      <Row className = "m-3 justify-content-center align-items-center" >
        <Col xs = { 4 } md = { 6 } lg = { 4 } >
          <SignUp />
        </Col>
      </Row>

    </Container>
  );
}

export default App;
