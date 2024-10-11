import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './Login';
import configureStore from 'redux-mock-store';
import { authenticationHandler } from '../../Store/authenticate';
import { alertActions } from '../../Store/alert';

const mockStore = configureStore([]);

jest.mock('../../Store/authenticate', () => ({
  authenticationHandler: jest.fn(),
}));

describe('Login Component Tests', () => {
  let store;
  
  beforeEach(() => {
    store = mockStore({
      alert: { message: '', type: '' },
    });
  });

  // 1. Renders the Login Component Correctly
  test('renders Login component with form fields and buttons', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Your Email ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Your Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByText("Forgot Password? Click Here")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  // 2. Displays an Error Alert When Email or Password is Empty
  test('shows error when email or password is not provided', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const loginButton = screen.getByRole('button', { name: /Login/i });
    userEvent.click(loginButton);

    const actions = store.getActions();
    expect(actions[0]).toEqual(alertActions.setAlert({ message: "Please fill up all the fields", type: "danger" }));
  });

  // 3. Calls Authentication Handler with Correct Email and Password
  test('calls authenticationHandler with correct email and password', async () => {
    authenticationHandler.mockResolvedValue([true, 'mockToken', 'test@example.com']);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Enter Your Email ID');
    const passwordInput = screen.getByPlaceholderText('Enter Your Password');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const loginButton = screen.getByRole('button', { name: /Login/i });
    userEvent.click(loginButton);

    expect(authenticationHandler).toHaveBeenCalledWith('test@example.com', 'password123', true);
  });

  // 4. Navigates to Signup Page When SignUp Button is Clicked
  test('navigates to signup page when SignUp button is clicked', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const signUpButton = screen.getByRole('button', { name: /Sign Up/i });
    userEvent.click(signUpButton);

    expect(window.location.pathname).toBe('/signup'); // Mocking navigate
  });

  // 5. Shows Forgot Password Link
  test('shows forgot password link', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const forgotPasswordLink = screen.getByText("Forgot Password? Click Here");
    expect(forgotPasswordLink).toBeInTheDocument();
  });
});