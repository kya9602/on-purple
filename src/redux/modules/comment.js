import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

export const __getComments = createAsyncThunk(
  "GET_COMMENTS",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_HOST}/comment/${payload}`);
      /* console.log(data.data.data) */
      return thunkAPI.fulfillWithValue(data?.data?.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const __getReComments = createAsyncThunk(
  "GET_RECOMMENTS",
  async (payload, thunkAPI) => {
   /*  console.log(payload) */
    try {
      const data = await axios.get(`${process.env.REACT_APP_HOST}/reComment/${payload}`);
      console.log(data.data.data)
      return thunkAPI.fulfillWithValue(data?.data?.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const __deleteComments = createAsyncThunk(
  // action 이름
  "DELETE_COMMENT",
  // 처리할 비동기 함수
  async (payload) => {
    // 서버에서 데이터를 삭제
    const res = await axios.delete(`${process.env.REACT_APP_HOST}/comment/${payload}`, {
      headers: {
        "Authorization": localStorage.getItem("Authorization"),
        "RefreshToken": localStorage.getItem("RefreshToken")
      }
    });
    if (res.data.success === true) {
      window.alert("댓글이 삭제되었습니다")
    }
    return res.data;
  }
);

export const __likeComment = createAsyncThunk(
  "LIKE_COMMENT",
  async (payload, thunkAPI) => {
    /* console.log(payload) */
    try {
      const data = await axios.post(`${process.env.REACT_APP_HOST}/comment/like/${payload}`, {}, {
        headers: {
          "Authorization": localStorage.getItem("Authorization"),
          "RefreshToken": localStorage.getItem("RefreshToken"),
        }
      });
      if(data.data.success === true){
        window.location.reload()
      } else if (data.data.success === false){
        window.alert("본인 댓글은 좋아요를 할 수 없습니다")
        window.location.reload()
      }
      console.log(data.data)
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);
const initialState = {
  comment: {
    comment:"",
    commentId:"",
    createdAt:[],
    likes:0,
    modifiedAt:[],
    nickname:"",
    reCommentResponseDtoList:[]
  },
  error: null,
  isLoading: false,
}

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    createComment(state, action) {
      state.comment.push(action.payload)
    },
    createreComment(state, action) {
      state.comment.push(action.payload)
    },
  },
  extraReducers: {
    [__getComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = action.payload;
    },
    [__getComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      let index = state.comment.findIndex(
        (comment) => comment.id === action.payload
      );
      /*  console.log(index); */
      state.comment.splice(index, 1);
    },
    [__deleteComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteComments.pending]: (state, action) => {
      state.isLoading = false;
    },

    [__likeComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__likeComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      /* state.comment = action.payload; */
     /*  if (action.payload == false && undefined) {
        action.payload.likes -= 1;
      } else {
        action.payload.likes += 1;
      } */
      console.log("payload",action.payload.likes)
      console.log("state",current(state.comment))
    },
    [__likeComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
})

export const { createComment, updataComment } = commentSlice.actions;
export default commentSlice.reducer;