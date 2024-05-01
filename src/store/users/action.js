import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { get } from "../../utils/storage";

export const getUsers = createAsyncThunk("users/get", async (_, thunkAPI) => {
  const token = localStorage.getItem("token");
  const userEmail = get("email");
  try {
    const url = `http://localhost:3001/getUsers`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Email: userEmail,
      },
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const updateUser = createAsyncThunk(
  "user/update",
  async (value, thunkAPI) => {
    const token = get("token");
    try {
      const url = `http://localhost:3001/updateUsers`;
      const fd = new FormData();
      fd.append("name", value.name);
      fd.append("img", value.img);
      fd.append("password", value.password);
      fd.append("email", value.email);
      const { data } = await axios.put(url, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
