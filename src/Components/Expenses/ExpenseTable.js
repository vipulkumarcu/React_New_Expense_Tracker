import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses, removeExpense } from "../../Store/expenses"; // Ensure the correct import path for your expenses actions
import { alertActions } from "../../Store/alert"; // Import alertActions
import ExpenseForm from "./ExpenseForm";

function ExpenseTable() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses); // Select expenses from the Redux store

  const [showForm, setShowForm] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  // Fetch expenses on component mount
  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  // Function to handle editing an expense
  function editUserExpense(expense) {
    setSelectedExpense(expense); // Set the selected expense data for editing
    setShowForm(true); // Show the form
  }

  // Function to toggle the expense form visibility
  function formToggler() {
    setShowForm(!showForm);
    setSelectedExpense(null); // Reset selected expense after closing the form
  }

  // Function to handle expense deletion
  function handleDelete(expenseId) {
    dispatch(removeExpense(expenseId)); // Dispatch the removeExpense action
    dispatch(alertActions.setAlert({ message: "Expense deleted successfully!", type: "success" })); // Show success alert
  }

  return (
    <>
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
              <td colSpan="10" style={{ textAlign: "center" }}>
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
                    onClick={() => editUserExpense(expense)}
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

      {showForm && (
        <ExpenseForm
          showForm={showForm}
          formToggler={formToggler}
          expenseToEdit={selectedExpense}
        />
      )}
    </>
  );
}

export default ExpenseTable;