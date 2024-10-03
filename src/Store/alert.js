import { createSlice } from "@reduxjs/toolkit";

// Initial state for alerts
const initialAlertState = {
  isValid: false,
  errorMessage: "",
  errorType: "",
};

// Create a slice for alert management
const alertSlice = createSlice({
  name: "alert",
  initialState: initialAlertState,
  reducers: {
    setAlert(state, action) {
      state.isValid = true;
      state.errorMessage = action.payload.message;
      state.errorType = action.payload.type;
    },
    clearAlert(state) {
      state.isValid = false;
      state.errorMessage = "";
      state.errorType = "";
    },
  },
});

// Export actions and reducer
export const alertActions = alertSlice.actions;
export default alertSlice.reducer;