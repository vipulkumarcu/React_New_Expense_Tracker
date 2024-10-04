import { createSlice } from "@reduxjs/toolkit";

// Initial state for theme (light or dark)
const initialThemeState = {
  theme: "light", // Default to light mode
};

// Create a slice for the theme reducer
const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light"; // Toggle between light and dark
    },
  },
});

// Export actions and reducer
export const themeActions = themeSlice.actions;
export default themeSlice.reducer;