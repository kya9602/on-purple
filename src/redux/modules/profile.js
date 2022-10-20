import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __getProfileDetail = createAsyncThunk(
  "GET_ProfileDetail",
  async (payload, thunkAPI) => {
    console.log("payload is ", payload)
    try {
      const data = await axios.get(`${process.env.REACT_APP_HOST}/profile/${payload}`,
        {
          headers: {
            "Authorization": localStorage.getItem("Authorization"),   //accesstoken
            "RefreshToken": localStorage.getItem("RefreshToken"),
          }
        });
      //console.log(data)
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

const initialState = {
  profile: {
    userId: 0,
    nickname: "",
    imageUrl: "",
    imageList: null,
    age: "",
    mbti: "",
    introduction: "",
    idealType: "",
    job: "",
    hobby: "",
    drink: "",
    pet: "",
    smoke: "",
    likeMovieType: "",
    area: ""
  },
  error: null,
  isLoading: false,
}

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    /* addNumber: (state, action) => {
      state.number = state.number + action.payload;
    }, */
  },

  extraReducers: {
    [__getProfileDetail.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getProfileDetail.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.posts = action.payload; // Store에 있는 posts에 서버에서 가져온 posts를 넣습니다.
    },
    [__getProfileDetail.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },

  }
});

export const { profile } = profileSlice.actions;
export default profileSlice.reducer;