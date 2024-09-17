import { useContext, useState } from "react";
import { Button, Table } from "react-bootstrap";
import ExpenseContext from "../../Context/expense-context";
import ExpenseForm from "./ExpenseForm";

function ExpenseTable ()
{
  const { expenses, removeExpense } = useContext ( ExpenseContext );
  const [ showForm, setShowForm ] = useState ( false );
  const [ selectedExpense, setSelectedExpense ] = useState ( null );

  function editUserExpense ( expense )
  {
    setSelectedExpense ( expense ); // Set the selected expense data for editing
    setShowForm ( true ); // Show the form
  }

  function formToggler ()
  {
    setShowForm ( !showForm );
    setSelectedExpense ( null ); // Reset selected expense after closing form
  }

  return (
    <>
      <Table striped bordered hover style = { { textAlign: "center" } }>

        <thead>

          <tr>
            <th> # </th>
            <th> Title </th>
            <th> Amount </th>
            <th> Date </th>
            <th> Caterogy </th>
            <th> Description </th>
            <th colSpan = "2" > Modify Data </th>
          </tr>

        </thead>

        <tbody>
          {
            expenses.length === 0
            ? (
              <tr>
                <td colSpan = "10" style = { { textAlign: "center" } } > No Expenses Found. </td>
              </tr>
            ) 
            : (
              expenses.map ( ( expense, index ) => (
                <tr key = { expense.id } > {/* Assuming expense has a unique id */}
                  <td> { index + 1 } </td>
                  <td> { expense.title } </td>
                  <td> { expense.amount } </td>
                  <td> { expense.date } </td>
                  <td> { expense.category } </td>
                  <td> { expense.description } </td>
                  <td> <Button className = "shadow" variant = "warning" onClick = { () => editUserExpense ( expense ) } > Edit </Button> </td>
                  <td> <Button className = "shadow" variant = "danger" onClick = { () => removeExpense ( expense.id ) } > Delete </Button> </td>
                </tr>
              ))
            )
          }
        </tbody>

      </Table>
      
      {
        showForm && ( <ExpenseForm showForm = { showForm } formToggler = { formToggler } expenseToEdit = { selectedExpense } /> )
      }
    </>
  );
}

export default ExpenseTable;
