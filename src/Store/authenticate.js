import { createSlice } from "@reduxjs/toolkit";

// Initial state for authentication
const initialAuthenticationState = {
  isAuthenticated: false, // Tracks if the user is logged in
  token: null,            // Stores the bearer token for API calls
  userId: null,           // Stores the user's ID
};

// Create a slice for the authentication reducer
const authenticationSlice = createSlice({
  name: "authentication",
  initialState: initialAuthenticationState,
  reducers: {
    // Action for logging in, saving the token and userId
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;  // Save the token
      state.userId = action.payload.userId; // Save the user ID
    },
    
    // Action for logging out, clearing the token and userId
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null;
    },
  },
});

// Async function to handle authentication (login/signup)
export const authenticationHandler = (email, password, isLogin) => {
  return async (dispatch) => {
    let url = isLogin
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAY0t64QOJOikMKYIQ9nYgx4GsZ4cOgoRA"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAY0t64QOJOikMKYIQ9nYgx4GsZ4cOgoRA";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message || "Authentication failed");
      }

      // If successful, dispatch the login action with the token and userId
      dispatch(
        authenticationSlice.actions.login({
          token: data.idToken,
          userId: data.localId,
        })
      );

      return [true, data.idToken, data.email];
    } catch (error) {
      // Handle any errors by displaying an alert message
      // handleAlertMessages(error.message || "Authentication failed", "danger");
      return [false, null, null];
    }
  };
};

// Export actions and reducer
export const authenticationActions = authenticationSlice.actions;
export default authenticationSlice.reducer;