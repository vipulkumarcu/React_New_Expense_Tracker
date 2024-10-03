import React, { useState } from "react";
import { Button, Card, CardBody, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticationHandler } from "../../Store/authenticate";
import { alertActions } from "../../Store/alert";

function SignUp() {
  const dispatch = useDispatch();
  const navigateToLoginPage = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function formSubmitHandler(event) {
    event.preventDefault();

    // Validate if fields are empty
    if (!email || !password || !confirmPassword) {
      dispatch(alertActions.setAlert({ message: "Please fill up all the fields", type: "danger" }));
      return;
    }

    // Validate if passwords match
    if (password !== confirmPassword) {
      dispatch(alertActions.setAlert({ message: "Passwords do not match", type: "danger" }));
      return;
    }

    // Call authentication handler and wait for response
    const [signupSuccess] = await dispatch(authenticationHandler(email, password, false)); // false means signup

    // Runs only after Signup is Successful
    if (signupSuccess) {
      dispatch(alertActions.setAlert({ message: "Signup Successful.", type: "success" }));
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      dispatch(alertActions.setAlert({ message: "Signup failed. Please try again.", type: "danger" }));
    }
  }

  return (
    <Container fluid style={{ textAlign: "center", padding: "3px" }}>
      <Row className="m-3 justify-content-center align-items-center">
        <Col xs={4} md={6} lg={4}>
          <Card className="shadow">
            <CardBody style={{ textAlign: "center" }}>
              <Card.Title className="m-4">Sign Up</Card.Title>
              <Form onSubmit={formSubmitHandler}>
                <FloatingLabel controlId="floatingInput" label="Email address" className="m-3">
                  <Form.Control type="email" placeholder="Enter Your Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password" className="m-3">
                  <Form.Control type="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="m-3">
                  <Form.Control type="password" placeholder="Enter Your Password Again" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </FloatingLabel>
                <Button variant="primary" className="m-3 p-2" style={{ height: "50px", width: "350px", borderRadius: "45px" }} type="submit">Sign Up</Button>
              </Form>
            </CardBody>
          </Card>
          <Button variant="success" className="m-3 p-3" onClick={() => navigateToLoginPage("/login")}>Have an Account? Login</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;