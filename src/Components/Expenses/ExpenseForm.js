import { useContext, useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import ExpenseContext from "../../Context/expense-context";

function ExpenseForm ( { showForm, formToggler, expenseToEdit  } )
{
  const { addExpense, updateExpense  } = useContext ( ExpenseContext );
  const [ expenseTitle, setExpenseTitle ] = useState ( "" );
  const [ expenseAmount, setExpenseAmount ] = useState ( "" );
  const [ expenseDate, setExpenseDate ] = useState ( "" );
  const [ expenseDescription, setExpenseDescription ] = useState ( "" );
  const [ expenseCategory, setExpenseCategory ] = useState ( "" );

  const formattedDate = new Date ( expenseDate ).toLocaleDateString ( 'en-GB',
    {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    }
  );

  // Use useEffect to populate form when editing
  useEffect (
    () => {
      if ( expenseToEdit )
      {
        setExpenseTitle ( expenseToEdit.title );
        setExpenseAmount ( expenseToEdit.amount );
        setExpenseDate ( expenseToEdit.date );
        setExpenseDescription ( expenseToEdit.description );
        setExpenseCategory ( expenseToEdit.category );
      }
    }, [ expenseToEdit ]
  );

  function formSubmitHandler ( event )
  {
    event.preventDefault ();

    const expense = {
      title: expenseTitle,
      amount: expenseAmount,
      date: formattedDate,
      category: expenseCategory,
      description: expenseDescription
    }

    if ( expenseToEdit )
    {
      // Update existing expense
      updateExpense ( expenseToEdit.id, expense );
    }
    
    else
    {
      // Add new expense
      addExpense ( expense );
    }
    
    setExpenseTitle ( "" );
    setExpenseAmount ( "" );
    setExpenseCategory ( "" );
    setExpenseDescription ( "" );

    formToggler ();
  }

  return (
    <Modal show = { showForm } onHide = { formToggler } >

      <Modal.Header closeButton>
        <Modal.Title> Add Expenses </Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Form onSubmit = { formSubmitHandler } >

          <FloatingLabel controlId = "expenseTitle" label = "Expense Title" className = "m-2">
            <Form.Control type = "text" placeholder = "Expense Title" value = { expenseTitle } onChange = { ( e ) => setExpenseTitle ( e.target.value ) } />
          </FloatingLabel>

          <FloatingLabel controlId = "expenseAmount" label = "Amount Spent" className = "m-2">
            <Form.Control type = "text" placeholder = "Expense Amount" value = { expenseAmount } onChange = { ( e ) => setExpenseAmount ( e.target.value ) } />
          </FloatingLabel>

          <FloatingLabel controlId = "expenseDate" label = "Date Spent" className = "m-2">
            <Form.Control type = "date" placeholder = "Date Spent" value = { expenseDate } onChange = { ( e ) => setExpenseDate ( e.target.value ) } />
          </FloatingLabel>

          <FloatingLabel controlId = "expenseCategory" label = "Expense Category" className = "m-2" >
            <Form.Select aria-label = "Expense Category" value = { expenseCategory } onChange = { ( e ) => setExpenseCategory ( e.target.value ) } >
              <option> Select One </option>
              <option value = "Food"> Food </option>
              <option value = "Travelling"> Travelling </option>
              <option value = "Shopping"> Shopping </option>
              <option value = "Others"> Others </option>
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel controlId = "expenseDescription" label = "Add Description" className = "m-2">
            <Form.Control as = "textarea" placeholder = "Leave a comment here" style = { { height: '100px' } } value = { expenseDescription } onChange = { ( e ) => setExpenseDescription ( e.target.value ) } />
          </FloatingLabel>

        </Form>

      </Modal.Body>

      <Modal.Footer>
        <Button variant = "secondary" onClick = { formToggler } > Close </Button>
        <Button variant = "danger" onClick = { formSubmitHandler } > { expenseToEdit  ? "Update" : "Add" } </Button>
      </Modal.Footer>

    </Modal>
    
  );
}

export default ExpenseForm;