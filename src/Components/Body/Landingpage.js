import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ExpenseForm from "../Expenses/ExpenseForm";
import ExpenseTable from "../Expenses/ExpenseTable";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../Store/theme";
import { alertActions } from "../../Store/alert"; 
import { saveAs } from "file-saver";

function Landingpage ()
{
  const [ showForm, setShowForm ] = useState ( false );
  const [ premiumActivated, setPremiumActivated ] = useState ( false );

  const dispatch = useDispatch ();

  // Get expenses and premium status from the Redux store
  const totalExpenses = useSelector (
    ( state ) => state.expenses.expenses.reduce ( ( total, exp ) => total + exp.amount, 0 )
  );
  const expenses = useSelector ( ( state ) => state.expenses.expenses );
  const showPremium = totalExpenses > 10000; // Check if total exceeds 10000
  const currentTheme = useSelector ( ( state) => state.theme.theme );

  function formToggler ()
  {
    setShowForm ( prev => !prev );
  }

  function activatePremium ()
  {
    setPremiumActivated ( true ); // Set premium activated to true
    dispatch(alertActions.setAlert({ message: "Premium Activated Successfully!", type: "success" }));
    // dispatch ( alertActions.setAlert ( { message: "Premium Activated Successfully", type: "success" } ) );
  }

  function toggleTheme ()
  {
    dispatch ( themeActions.toggleTheme () ); // Dispatch theme toggle action
  }

  function exportToCSV ()
  {
    const headers = "Title, Amount, Date, Category, Description \n"; // CSV headers
    const rows = expenses.map (
      ( expense ) => 
      `${expense.title},${expense.amount},${new Date(expense.date).toLocaleDateString("en-GB")},${expense.category},${expense.description}`
    )
    .join("\n");

    const csvContent = headers + rows;
    const blob = new Blob ( [ csvContent ], { type: "text/csv;charset=utf-8" } );
    saveAs ( blob, "expenses.csv" );
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

        <Col>
          {
            !premiumActivated && showPremium && (
              <Button variant = "success" className = "m-2 p-2" onClick = { activatePremium } >
                Activate Premium
              </Button>
            )
          }

          {
            premiumActivated &&
            <Button variant = { currentTheme === "dark" ? "light" : "dark" } className = "m-2 p-2" onClick = { toggleTheme } >
              { currentTheme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme" }
            </Button>
          }
        </Col>

      </Row>

      <Row>
        <Col>
          <ExpenseTable />
        </Col>
      </Row>

      <Row>
        <Col>
          {
            premiumActivated &&
            <Button variant = "success" className = "mb-3" onClick = { exportToCSV } > Download Your Data </Button>
          }
        </Col>
      </Row>

    </Container>
  );
}

export default Landingpage;