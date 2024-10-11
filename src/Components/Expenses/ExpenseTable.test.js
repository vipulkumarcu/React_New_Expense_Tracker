import { render, screen, fireEvent } from '@testing-library/react';
import ExpenseTable from './ExpenseTable'; // Assuming the component is in the same folder
import { Provider } from 'react-redux';
import { store } from '../../Store'; // Import your Redux store
import { fetchExpenses, removeExpense } from '../../Store/expenses';
import { alertActions } from '../../Store/alert';
import { mockExpenses } from './mockData'; // Assuming mock data for expenses

// Mock the API calls
jest.mock('../../Store/expenses', () => ({
  fetchExpenses: jest.fn(),
  removeExpense: jest.fn(),
}));

jest.mock('../../Store/alert', () => ({
  alertActions: {
    setAlert: jest.fn(),
  },
}));

// Helper function to render component with Redux provider
const renderComponent = () =>
  render(
    <Provider store={store}>
      <ExpenseTable />
    </Provider>
  );

describe('ExpenseTable Component', () => {
  beforeEach(() => {
    fetchExpenses.mockReturnValue({ type: 'FETCH_EXPENSES', payload: mockExpenses });
  });

  test('should render the table with the correct headers', () => {
    renderComponent();
    const headers = ['#', 'Title', 'Amount', 'Date', 'Category', 'Description', 'Modify Data'];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  test('should display a message when no expenses are available', () => {
    fetchExpenses.mockReturnValue({ type: 'FETCH_EXPENSES', payload: [] });
    renderComponent();
    expect(screen.getByText('No Expenses Found.')).toBeInTheDocument();
  });

  test('should render the correct number of expenses', () => {
    renderComponent();
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(mockExpenses.length + 1); // Include header row
  });

  test('should call fetchExpenses when the component mounts', () => {
    renderComponent();
    expect(fetchExpenses).toHaveBeenCalledTimes(1);
  });

  test('should render expense data correctly', () => {
    renderComponent();
    mockExpenses.forEach((expense) => {
      expect(screen.getByText(expense.title)).toBeInTheDocument();
      expect(screen.getByText(expense.amount)).toBeInTheDocument();
      expect(screen.getByText(expense.category)).toBeInTheDocument();
      expect(screen.getByText(expense.description)).toBeInTheDocument();
    });
  });

  test('should call removeExpense and display success alert when an expense is deleted', () => {
    renderComponent();
    const deleteButton = screen.getAllByText('Delete')[0]; // Select the first delete button
    fireEvent.click(deleteButton);
    expect(removeExpense).toHaveBeenCalledWith(mockExpenses[0].id);
    expect(alertActions.setAlert).toHaveBeenCalledWith({
      message: 'Expense deleted successfully!',
      type: 'success',
    });
  });

  test('should show the "Edit" button for each expense', () => {
    renderComponent();
    const editButtons = screen.getAllByText('Edit');
    expect(editButtons).toHaveLength(mockExpenses.length);
  });

  test('should log "Edit Expense" when edit button is clicked', () => {
    console.log = jest.fn(); // Mock console.log
    renderComponent();
    const editButton = screen.getAllByText('Edit')[0];
    fireEvent.click(editButton);
    expect(console.log).toHaveBeenCalledWith('Edit Expense', mockExpenses[0]);
  });

  test('should render the correct expense date format', () => {
    renderComponent();
    mockExpenses.forEach((expense) => {
      expect(screen.getByText(new Date(expense.date).toLocaleDateString('en-GB'))).toBeInTheDocument();
    });
  });

  test('should render "Delete" button for each expense and allow deletion', () => {
    renderComponent();
    const deleteButtons = screen.getAllByText('Delete');
    expect(deleteButtons).toHaveLength(mockExpenses.length);
  });
});