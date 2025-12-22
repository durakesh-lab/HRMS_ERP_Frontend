import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/auth';

// Async Thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Persist user
      return response.data.user; // Assuming API returns user object
    } catch (error) {
      const message = error.response?.data?.message;
      return rejectWithValue(Array.isArray(message) ? message.join(', ') : message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
      // localStorage.setItem('accessToken', response.data.accessToken);
      // localStorage.setItem('refreshToken', response.data.refreshToken);
      return response.data.user;
    } catch (error) {
      const message = error.response?.data?.message;
      return rejectWithValue(Array.isArray(message) ? message.join(', ') : message || 'Registration failed');
    }
  }
);

// Rehydrate user from localStorage
const storedUser = localStorage.getItem('user');
const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user'); // Clear user
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Signup
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Do not set user on register, as we want them to login
        // state.user = action.payload; 
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, resetStatus } = authSlice.actions;
export default authSlice.reducer;
