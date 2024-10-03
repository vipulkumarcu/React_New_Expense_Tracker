import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state for expenses
const initialExpensesState = {
  expenses: [],           // Array to hold the user's expenses
  showPremium: false,      // Boolean to toggle premium button visibility
  loading: false,          // Loading state for async actions
  error: null,             // To handle any errors during API calls
};

// Async Thunk to add an expense to the database
export const addExpense = createAsyncThunk(
  'expenses/addExpense',
  async (expense, { getState, rejectWithValue }) => {
    const state = getState();
    const email = localStorage.getItem("Email" || null);
    const url = "https://new-expense-tracker-63df8-default-rtdb.firebaseio.com/expenses.json";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: email,
          expenses: expense,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add data.");
      }

      const data = await response.json();
      return { ...expense, id: data.name };  // Return new expense with generated id
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk to fetch all expenses from the backend
export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async (_, { getState, rejectWithValue }) => {
    const userEmailToFilter = localStorage.getItem("Email" || null);
    const url = "https://new-expense-tracker-63df8-default-rtdb.firebaseio.com/expenses.json";

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch expenses.");
      }

      const data = await response.json();

      if (data) {
        const filteredExpenses = Object.entries(data)
          .filter(([_, value]) => value.userEmail === userEmailToFilter)
          .map(([key, value]) => ({ id: key, ...value.expenses }));

        return filteredExpenses;
      } else {
        return [];
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk to remove an expense from the database
export const removeExpense = createAsyncThunk(
  'expenses/removeExpense',
  async (id, { rejectWithValue }) => {
    const url = `https://new-expense-tracker-63df8-default-rtdb.firebaseio.com/expenses/${id}.json`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete data.");
      }

      return id;  // Return the ID of the deleted expense
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk to update an expense in the database
export const updateExpense = createAsyncThunk(
  'expenses/updateExpense',
  async ({ id, updatedExpense }, { rejectWithValue }) => {
    const email = localStorage.getItem("Email" || null);
    const url = `https://new-expense-tracker-63df8-default-rtdb.firebaseio.com/expenses/${id}.json`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: email,
          expenses: updatedExpense,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update expense.");
      }

      return { id, updatedExpense };  // Return the updated expense
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the expenses slice
const expensesSlice = createSlice({
  name: "expenses",
  initialState: initialExpensesState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle addExpense
    builder.addCase(addExpense.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addExpense.fulfilled, (state, action) => {
      state.loading = false;
      state.expenses.push(action.payload);

      // Check if total expenses exceed 10,000
      const totalExpenses = state.expenses.reduce((total, exp) => total + exp.amount, 0);
      state.showPremium = totalExpenses > 10000;
    });
    builder.addCase(addExpense.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle fetchExpenses
    builder.addCase(fetchExpenses.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.loading = false;
      state.expenses = action.payload;

      // Check if total expenses exceed 10,000
      const totalExpenses = state.expenses.reduce((total, exp) => total + exp.amount, 0);
      state.showPremium = totalExpenses > 10000;
    });
    builder.addCase(fetchExpenses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle removeExpense
    builder.addCase(removeExpense.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeExpense.fulfilled, (state, action) => {
      state.loading = false;
      state.expenses = state.expenses.filter(exp => exp.id !== action.payload);

      // Recheck if total expenses exceed 10,000
      const totalExpenses = state.expenses.reduce((total, exp) => total + exp.amount, 0);
      state.showPremium = totalExpenses > 10000;
    });
    builder.addCase(removeExpense.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle updateExpense
    builder.addCase(updateExpense.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateExpense.fulfilled, (state, action) => {
      state.loading = false;
      state.expenses = state.expenses.map(exp =>
        exp.id === action.payload.id ? { ...exp, ...action.payload.updatedExpense } : exp
      );

      // Recheck if total expenses exceed 10,000
      const totalExpenses = state.expenses.reduce((total, exp) => total + exp.amount, 0);
      state.showPremium = totalExpenses > 10000;
    });
    builder.addCase(updateExpense.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const expensesActions = expensesSlice.actions;
export default expensesSlice.reducer;