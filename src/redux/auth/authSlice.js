import { createSlice } from '@reduxjs/toolkit';
import { login, logout, refreshUser, register } from './operations';

export const initialAuthState = {
  user: { name: null, email: null },
  token: null,
  isRefreshing: false,
};

const handlePending = state => {
  state.isRefreshing = true;
};

const handleRejected = state => {
  state.isRefreshing = false;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  extraReducers: builder => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(login.pending, handlePending)
      .addCase(logout.pending, handlePending)
      .addCase(refreshUser.pending, handlePending)
      .addCase(register.rejected, handleRejected)
      .addCase(login.rejected, handleRejected)
      .addCase(logout.rejected, handleRejected)
      .addCase(refreshUser.rejected, handleRejected)
      .addCase(register.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isRefreshing = false;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isRefreshing = false;
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = null;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
