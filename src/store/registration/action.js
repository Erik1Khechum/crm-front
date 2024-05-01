import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registration = createAsyncThunk(
  "auth/reg",
  async (value, thunkAPI) => {
    try {
      const url = `http://localhost:3001/registration`;
      const fd = new FormData();
      fd.append("name", value.name);
      fd.append("img", value.img);
      fd.append("email", value.email);
      fd.append("password", value.password);
      fd.append("surname", value.surname);
      fd.append("birthday", value.birthday);
      fd.append("gender", value.gender);
      const { data } = await axios.post(url, fd);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
