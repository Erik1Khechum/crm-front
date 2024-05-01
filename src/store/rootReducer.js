import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./registration/slice";
import userSlice from "./users/slice";
import loginSlice from "./login/slice";

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  login: loginSlice,
});

export default rootReducer;
