// src/features/login/loginSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from './loginApi';

interface LoginState {
  user: any; // Adjust the type based on your actual user structure
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LoginState = {
  user: null,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk('login/loginUser', async (credentials: any) => {
  const response = await loginApi(credentials);
  return response.data; // Adjust this based on your API response structure
});

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export default loginSlice.reducer;
