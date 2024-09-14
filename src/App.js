import { Col, Container, Row } from "react-bootstrap";
import SignUp from "./Components/Authentication/SignUp";

function App ()
{
  return (
    <Container style = { { textAlign: "center" } }>

      <h1> Expense Tracker </h1>

      <Container>
        <Row>
          <Col xs = { 4 } >
            <SignUp />
          </Col>
        </Row>
      </Container>

    </Container>
  );
}

export default App;
