import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ChangePassword from './ChangePassword';
import ExpenseContext from '../../Context/expense-context';

describe('ChangePassword Component Tests', () => {
  
  // 1. Render the ChangePassword Component Correctly
  test('renders ChangePassword component correctly', () => {
    render(
      <BrowserRouter>
        <ChangePassword />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Reset Your Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Your Email ID')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset Password/i })).toBeInTheDocument();
  });

  // 2. Submit Button is Disabled When Loading
  test('shows loading spinner when form is submitted', async () => {
    render(
      <BrowserRouter>
        <ChangePassword />
      </BrowserRouter>
    );
    
    const button = screen.getByRole('button', { name: /Reset Password/i });
    userEvent.click(button);
    
    expect(button).toBeDisabled();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();  // Checks the loading spinner
  });

  // 3. Displays Error Alert When Email Field is Empty
  test('displays error message when email field is empty', async () => {
    render(
      <BrowserRouter>
        <ChangePassword />
      </BrowserRouter>
    );
    
    const button = screen.getByRole('button', { name: /Reset Password/i });
    userEvent.click(button);
    
    expect(screen.getByText('Please enter your email id')).toBeInTheDocument();
  });

  // 4. Calls Change Password Handler with Correct Email
  test('calls changePasswordHandler with correct email', async () => {
    const changePasswordHandler = jest.fn();
    
    render(
      <BrowserRouter>
        <ExpenseContext.Provider value={{ changePasswordHandler }}>
          <ChangePassword />
        </ExpenseContext.Provider>
      </BrowserRouter>
    );
    
    const emailInput = screen.getByPlaceholderText('Enter Your Email ID');
    userEvent.type(emailInput, 'test@example.com');
    
    const button = screen.getByRole('button', { name: /Reset Password/i });
    userEvent.click(button);
    
    expect(changePasswordHandler).toHaveBeenCalledWith('test@example.com');
  });

  // 5. Navigate to Login Page on Button Click
  test('navigates to login page on button click', () => {
    const navigate = jest.fn();
    
    render(
      <BrowserRouter>
        <ChangePassword />
      </BrowserRouter>
    );
    
    const goToLoginButton = screen.getByRole('button', { name: /Go To Login/i });
    userEvent.click(goToLoginButton);
    
    expect(navigate).toHaveBeenCalledWith('/login');
  });
});