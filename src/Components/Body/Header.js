import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header ()
{
  return (
    <Container style = { { margin: 0, padding: 0 } } >

      <Row>
        <Col>
          <em> Welcome To Expense Tracker !!! </em>
        </Col>

        <Col>
          <p> Your profile is incomplete. <Link to = "/update" > Complete now. </Link> </p>
        </Col>
      </Row>
      
      <hr />
    </Container>
  )
}

export default Header;