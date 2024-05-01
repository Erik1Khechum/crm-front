import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("user/login", async (value, thunkAPI) => {
  try {
    const url = `http://localhost:3001/login`;
    const { data } = await axios.post(url, value);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const logOut = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    const url = `http://localhost:3001/logOut`;
    const { data } = await axios.post(url, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});
