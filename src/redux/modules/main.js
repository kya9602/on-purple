import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __getMain = createAsyncThunk(
  "/main",
  async (payload, thunkAPI) => {
    try {

      const data = await axios.get(`${process.env.REACT_APP_HOST}/main`);
      // console.log(data.data.data);
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

const initialState = {
  data: [{
    profileId: "",
    nickname: "",
    imageUrl: "",
    age: "",
    mbti: "",
    introduction: "",
    area: ""
  }],
  error: null,
  isLoading: false,
}

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {

  },

  extraReducers: {
    [__getMain.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
  }
})

export default mainSlice.reducer;