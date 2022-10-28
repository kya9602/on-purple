import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";



//user info 정보 불러오기
export const __getUser = createAsyncThunk(
  "GET_USER",
  async (payload, thunkAPI) => {
    try {
      
      const data = await axios.get(`${process.env.REACT_APP_HOST}/user/me`, {
        headers: {
          "Authorization": localStorage.getItem("Authorization"),   //accesstoken
          "RefreshToken": localStorage.getItem("RefreshToken"),
        }
      });

      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);


const initialState = {
  user: {
    userId: 0,
    nickname: "",
    imageUrl: "",
    imgList: "",
  },
  error: null,
  isLoading: false,
}

export const signupSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: {


    [__getUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;

    },
    [__getUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getUser.pending]: (state) => {
      state.isLoading = true;
    },


  }
})

export let { UserData } = signupSlice.actions;

export default signupSlice.reducer;