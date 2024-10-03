import React, { useState } from "react";
import { Button, Card, CardBody, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticationHandler } from "../../Store/authenticate";
import { alertActions } from "../../Store/alert";

function Login() {
  const navigateToLandingPage = useNavigate();
  const navigateToSignupPage = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function formSubmitHandler(event) {
    event.preventDefault();

    // Validate if fields are empty
    if (!email || !password) {
      dispatch(alertActions.setAlert({ message: "Please fill up all the fields", type: "danger" }));
      return;
    }

    const [loginSuccess, token, userEmail] = await dispatch(authenticationHandler(email, password, true));

    // Runs only after Login is Successful
    if (loginSuccess) {
      localStorage.setItem("Token", token);
      localStorage.setItem("Email", userEmail);
      navigateToLandingPage("/landing-page");
    } else {
      dispatch(alertActions.setAlert({ message: "Login failed. Please try again.", type: "danger" }));
    }
  }

  return (
    <Container fluid style={{ textAlign: "center", padding: "3px" }}>
      <Row className="m-3 justify-content-center align-items-center">
        <Col xs={4} md={6} lg={4}>
          <Card className="shadow">
            <CardBody style={{ textAlign: "center" }}>
              <Card.Title className="m-4">Login</Card.Title>
              <Form onSubmit={formSubmitHandler}>
                <FloatingLabel controlId="floatingInput" label="Email address" className="m-3">
                  <Form.Control type="email" placeholder="Enter Your Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password" className="m-3">
                  <Form.Control type="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FloatingLabel>
                <Button variant="primary" className="m-3 p-2" style={{ height: "50px", width: "350px", borderRadius: "45px" }} type="submit">Login</Button>
              </Form>
              <a href="/change-password">Forgot Password? Click Here</a>
            </CardBody>
          </Card>
          <Button variant="dark" className="m-3 p-3" onClick={() => navigateToSignupPage("/signup")}>Don't Have an Account? Sign Up</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;