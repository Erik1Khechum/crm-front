import { createSlice } from "@reduxjs/toolkit";
import { getUsers, updateUser } from "./action";

export const initialState = {
  error: "",
  status: "idle",
  users: [],
  updated: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = "Pending";
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        (state.status = "Fulfilled"), (state.users = payload);
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.status = "Rejected";
        state.error = payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "Pending";
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.status = "Fulfilled";
        state.updated = true;
        window.location = "/people";
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.status = "Rejected";
        state.error = payload;
      });
  },
});

export default userSlice.reducer;
