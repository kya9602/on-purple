import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __getPosts = createAsyncThunk(
  "GET_POSTS",
  async (payload, thunkAPI) => {
    /* console.log(payload) */ /* 무한스크롤&page=0&size=10 */
    try {
      const data = await axios.get(`${process.env.REACT_APP_HOST}/post?category=${payload}`);
      /*  console.log(data.data.data) */
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const __getPostsDetail = createAsyncThunk(
  "GET_POSTS_DETAIL",
  async (payload, thunkAPI) => {
    /* console.log(payload) */
    try {
      const data = await axios.get(`${process.env.REACT_APP_HOST}/post/${payload}`);
      /* console.log(data.data.data) */
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);



// createAsyncThunk 생성하기
export const __deletePosts = createAsyncThunk(
  // action 이름
  "DELETE_POSTS",
  // 처리할 비동기 함수
  async (payload) => {
    // 서버에서 데이터를 삭제
    const res = await axios.delete(`${process.env.REACT_APP_HOST}/post/${payload}`, {
      headers: {
        "Authorization": localStorage.getItem("Authorization"),
        "RefreshToken": localStorage.getItem("RefreshToken")
      }
    });
    return res.data;
  }
);

export const __likePost = createAsyncThunk(
  "LIKE_POST",
  async (payload, thunkAPI) => {
    /* console.log(payload) */
    try {
      const data = await axios.post(`${process.env.REACT_APP_HOST}/post/like/${payload}`, {}, {
        headers: {
          "Authorization": localStorage.getItem("Authorization"),
          "RefreshToken": localStorage.getItem("RefreshToken"),
        }
      });
      if (data.data.success === false) {
        window.alert("본인 게시글엔 좋아요를 할 수 없습니다")
        window.location.reload()
      }
      /* console.log(data.data) */
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const __searchPosts = createAsyncThunk(
  "GET_POSTS",
  async (payload, thunkAPI) => {
    console.log(payload)
    try {
      const data = await axios.get(`${process.env.REACT_APP_HOST}/post/search?keyword=${payload}`);
      /*  console.log(data.data.data) */
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);
const initialState = {
  post: [],
  detail: {
    postId: 0,
    nickname: "",
    title: "",
    content: "",
    imgList: [],
    likes: 0,
    createdAt: [],
    commentResponseDtoList: [],
    modifiedAt: [],
    category: "",
    view: 0,
  },
  error: null,
  isLoading: false,
}

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
  },
  extraReducers: {
    [__getPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    },
    [__getPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getPosts.pending]: (state) => {
      state.isLoading = true;

    },
    [__getPostsDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.detail = action.payload;
    },
    [__getPostsDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getPostsDetail.pending]: (state) => {
      state.isLoading = true;
    },

    [__likePost.pending]: (state) => {
      state.isLoading = true;
    },
    [__likePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (action.payload === false) {
        state.detail.likes -= 1;
      } else {
        state.detail.likes += 1;
      }
      /* console.log("payload",action.payload)
      console.log("state",current(state.detail)) */
    },
    [__likePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__deletePosts.pending]: (state, action) => {
      state.isLoading = true
    },

    [__deletePosts.fulfilled]: (state, action) => {
      state.post = action.payload;
      /* console.log(action.payload) */
    },
    [__deletePosts.rejected]: (state, action) => {

    },

    [__searchPosts.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__searchPosts.fulfilled]: (state, action) => {
      // console.log(action.payload);
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.post = action.payload;
    },
    [__searchPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
})


export const { updataCard } = postSlice.actions;
export default postSlice.reducer;