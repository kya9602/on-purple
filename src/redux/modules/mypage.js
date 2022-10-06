import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

//user info 정보 불러오기
export const __getMypage = createAsyncThunk(
  "GET_MYPAGE",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_HOST}/mypage/${payload}`, {
        headers: {
          "Authorization": localStorage.getItem("Authorization"),   //accesstoken
          "RefreshToken": localStorage.getItem("RefreshToken"),
        }
      });
      // console.log('get data is', data.data.data)
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

const initialState = {
    mypage:[],
    error: null,
    isLoading: false,
}

export const detailSlice = createSlice({
  name: "mypage",
  initialState,
  reducers: {
  },
  extraReducers: {


    [__getMypage.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.mypage = action.payload;
      // console.log("action is", action.payload.data)
    },
    [__getMypage.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getMypage.pending]: (state) => {
      state.isLoading = true;
    },


  }
})

export const { updatePost } = detailSlice.actions;

export default detailSlice.reducer;