import { createSlice } from "@reduxjs/toolkit";
import { login, logOut } from "./action";
import { set, remove } from "../../utils/storage";

export const initialState = {
  isAuthenticated: false,
  error: "",
  status: "idle",
  users: {},
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "Pending";
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        set("email", payload.email);
        set("token", payload.token);
        state.isAuthenticated = true;
        state.status = "Fulfilled";
        state.users = payload;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isAuthenticated = false;
        state.status = "Rejected";
        state.error = payload;
      })
      ///logout
      .addCase(logOut.pending, (state) => {
        state.status = "Pending";
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.status = "Fulfilled";
        state.users = {};
        remove("token");
        remove("email");
        window.location = "/login";
      })
      .addCase(logOut.rejected, (state) => {
        state.isAuthenticated = false;
        state.status = "Fulfilled";
        state.users = {};
        window.location = "/login";
      });
  },
});

export default loginSlice.reducer;
