import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __addComment = createAsyncThunk(
  "ADD_COMMENT",
  async (payload, thunkAPI) => {
      try {
          const data = await axios.get(`${process.env.REACT_APP_HOST}/comment/${payload}`);
          return thunkAPI.fulfillWithValue(data.data.data);
      } catch (error) {
          return thunkAPI.rejectWithValue(error.code);
      }
  }
);

export const __getComments = createAsyncThunk(
    "GET_COMMENTS",
    async (payload, thunkAPI) => {
        try {
            const data = await axios.get(`${process.env.REACT_APP_HOST}/comment/${payload}`);
            /* console.log(data) */
            return thunkAPI.fulfillWithValue(data.data);
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
      const res = await axios.delete(`${process.env.REACT_APP_HOST}/comment/${payload}`);
      // action의 payload 리턴
      return res.data;
    }
  );

const initialState = {  
    comment: {
      comment:"",
      commentId:"",
      likes:"",
},
    error: null,
    isLoading: false,
}

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
    },
    extraReducers: {
        [__addComment.fulfilled]: (state, action) => {
          state.isLoading = false;
          state.comment = action.payload;
        },
        [__addComment.rejected]: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
        [__addComment.pending]: (state) => {
        state.isLoading = true;
        }, 
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
            state.list = action.payload;
        },
        [__deleteComments.rejected]: (state, action) => {
        
        },
}})

export const { addComment } = commentSlice.actions;
export default commentSlice.reducer;