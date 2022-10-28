import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __getMain = createAsyncThunk(
  "/main",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_HOST}/main`);

      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);


export const __postLike = createAsyncThunk(
  "/user/like/profileId",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(`${process.env.REACT_APP_HOST}/user/like/${payload}`, {}, {
        headers: {
          "Authorization": localStorage.getItem("Authorization"),
          "RefreshToken": localStorage.getItem("RefreshToken"),
        }
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const __postUnLike = createAsyncThunk(
  "/user/unlike/profileId",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(`${process.env.REACT_APP_HOST}/user/unlike/${payload}`, {}, {
        headers: {
          "Authorization": localStorage.getItem("Authorization"),
          "RefreshToken": localStorage.getItem("RefreshToken"),
        }
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);


const initialState = {

  data: [{
    userId: "",
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

    //like (right swipe)
    [__postLike.pending]: (state) => {
      state.isLoading = true;
    },
    [__postLike.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__postLike.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //unlike (left swipe)
    [__postUnLike.pending]: (state) => {
      state.isLoading = true;
    },
    [__postUnLike.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__postUnLike.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },



  }
})

export default mainSlice.reducer;