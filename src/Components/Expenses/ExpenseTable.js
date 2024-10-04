import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses, removeExpense } from "../../Store/expenses";
import { alertActions } from "../../Store/alert"; 

function ExpenseTable() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);

  // Fetch expenses when the component mounts
  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  // Handle deleting an expense
  function handleDelete(expenseId) {
    dispatch(removeExpense(expenseId));
    dispatch(alertActions.setAlert({ message: "Expense deleted successfully!", type: "success" }));
  }

  return (
    <Table striped bordered hover style={{ textAlign: "center" }}>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Category</th>
          <th>Description</th>
          <th colSpan="2">Modify Data</th>
        </tr>
      </thead>
      <tbody>
        {expenses.length === 0 ? (
          <tr>
            <td colSpan="8" style={{ textAlign: "center" }}>
              No Expenses Found.
            </td>
          </tr>
        ) : (
          expenses.map((expense, index) => (
            <tr key={expense.id}>
              <td>{index + 1}</td>
              <td>{expense.title}</td>
              <td>{expense.amount}</td>
              <td>{new Date(expense.date).toLocaleDateString("en-GB")}</td>
              <td>{expense.category}</td>
              <td>{expense.description}</td>
              <td>
                <Button
                  className="shadow"
                  variant="warning"
                  onClick={() => console.log("Edit Expense", expense)}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  className="shadow"
                  variant="danger"
                  onClick={() => handleDelete(expense.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}

export default ExpenseTable;