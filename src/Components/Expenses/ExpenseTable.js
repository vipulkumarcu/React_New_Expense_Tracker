import { useContext } from "react";
import { Button, Table } from "react-bootstrap";
import ExpenseContext from "../../Context/expense-context";

function ExpenseTable ()
{
  const { expenses, removeExpense } = useContext ( ExpenseContext );

  return (
    <Table striped bordered hover style = { { textAlign: "center" } }>

      <thead>

        <tr>
          <th> # </th>
          <th> Title </th>
          <th> Amount </th>
          <th> Date </th>
          <th> Caterogy </th>
          <th> Description </th>
          {/* <th> Edit Button </th>
          <th> Delete Button </th> */}
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
                <td> { expense.date } </td>
                <td> { expense.category } </td>
                <td> { expense.description } </td>
                {/* <td> <Button className = "shadow" variant = "warning" onClick = { () => removeExpense ( expense.id) } > Edit </Button> </td>
                <td> <Button className = "shadow" variant = "danger" onClick = { () => removeExpense ( expense.id) } > Delete </Button> </td> */}
              </tr>
            ))
          )
        }
      </tbody>

    </Table>
  )
}

export default ExpenseTable;
