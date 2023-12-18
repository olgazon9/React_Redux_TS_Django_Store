// src/features/register/registerSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerApi } from './registerApi';

interface RegisterState {
  user: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RegisterState = {
  user: null,
  status: 'idle',
  error: null,
};

export const registerUser = createAsyncThunk('register/registerUser', async (userData: any) => {
  try {
    const response = await registerApi(userData);
    return response.data; // Adjust based on your API response structure
  } catch (error) {
    // Handle error scenarios
    throw new Error('Registration failed'); // Adjust as needed
  }
});

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the user state with the received data
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export default registerSlice.reducer;
