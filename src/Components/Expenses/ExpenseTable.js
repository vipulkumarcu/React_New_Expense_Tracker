import { useContext } from "react";
import { Button, Table } from "react-bootstrap";
import ExpenseContext from "../../Context/expense-context";

function ExpenseTable ()
{
  const { expenses, removeExpense } = useContext ( ExpenseContext );

  return (
    <Table striped bordered hover>

      <thead>

        <tr>
          <th> # </th>
          <th> Title </th>
          <th> Amount </th>
          <th> Caterogy </th>
          <th> Description </th>
          <th> Delete Button </th>
        </tr>

      </thead>

      <tbody>
        {
          expenses.length === 0
          ? (
            <tr>
              <td colSpan = "6" style = { { textAlign: "center" } } > No Expenses Found. </td>
            </tr>
          ) 
          : (
            expenses.map ( ( expense, index ) => (
              <tr key = { expense.id } > {/* Assuming expense has a unique id */}
                <td> { index + 1 } </td>
                <td> { expense.title } </td>
                <td> { expense.amount } </td>
                <td> { expense.category } </td>
                <td> { expense.description } </td>
                <td> <Button variant = "danger" onClick = { () => removeExpense ( expense.id) } > Delete </Button> </td>
              </tr>
            ))
          )
        }
      </tbody>

    </Table>
  )
}

export default ExpenseTable;
