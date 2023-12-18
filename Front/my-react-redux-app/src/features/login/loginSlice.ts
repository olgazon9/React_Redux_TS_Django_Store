// src/features/login/loginSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from './loginApi';

interface AuthUser {
  id: number;
  username: string;
  // Add other user details as needed
}

interface ApiResponse {
  access_token: string;
  user: AuthUser;
  // Add other properties as needed
}

interface LoginState {
  user: AuthUser | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LoginState = {
  user: null,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk('login/loginUser', async (credentials: any, { rejectWithValue }) => {
  try {
    const response = await loginApi(credentials);

    // Assuming the user data is directly under the 'user' key
    const apiResponse: ApiResponse = response.data;

    console.log('API Response:', apiResponse);

    const token = apiResponse.access_token;

    if (!token) {
      throw new Error('Access token not found in the API response');
    }

    sessionStorage.setItem('authToken', token);

    const authUser: AuthUser = apiResponse.user;

    if (!authUser) {
      throw new Error('User data not found in the API response');
    }

    return authUser;
  } catch (error: any) {
    console.error('Error in loginUser:', error);
    return rejectWithValue(error.response?.data ?? 'An error occurred');
  }
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
        state.error = action.payload as string;
      });
  },
});

export default loginSlice.reducer;
