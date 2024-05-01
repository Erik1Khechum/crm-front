import { createSlice } from "@reduxjs/toolkit";
import { registration } from "./action";

export const initialState = {
  isAuthenticated: false,
  error: "",
  status: "idle",
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.status = "Pending";
      })
      .addCase(registration.fulfilled, (state, { payload }) => {
        (state.isAuthenticated = true),
          (state.status = "Fulfilled"),
          (state.user = payload);
      })
      .addCase(registration.rejected, (state, { payload }) => {
        state.status = "Rejected";
        state.error = payload;
      });
  },
});

export default authSlice.reducer;
