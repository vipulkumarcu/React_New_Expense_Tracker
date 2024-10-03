import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ExpenseForm from "../Expenses/ExpenseForm";
import ExpenseTable from "../Expenses/ExpenseTable";

function Landingpage ()
{
  const [ showForm, setShowForm ] = useState ( false );

  function formToggler ()
  {
    setShowForm ( prev => !prev );
  }

  return (
    <Container fluid>

      <Row style = { { textAlign: "center", margin: "10px" } }>
        <Col>
        {
          showForm
          ? <ExpenseForm showForm = { showForm } formToggler = { formToggler } />
          : <Button variant = "info" className = "m-2 p-2" onClick = { formToggler } > Add Expenses </Button>
        }
        </Col>
      </Row>

      <Row>
        <Col>
          <ExpenseTable />
        </Col>
      </Row>

    </Container>
  );
}

export default Landingpage;