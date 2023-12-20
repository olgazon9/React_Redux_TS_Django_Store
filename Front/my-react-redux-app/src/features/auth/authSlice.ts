// src/features/auth/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  authToken: string | null; // Assuming authToken is the access token
  // Add other relevant user information
}

const initialState: AuthState = {
  isAuthenticated: false,
  authToken: null,
  // Add other initial state properties as needed
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.authToken = action.payload;
      // Add logic to update other user information if needed
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.authToken = null;
      // Clear other user information if needed
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
