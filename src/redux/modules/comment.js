import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const __getComments = createAsyncThunk(
    "GET_COMMENTS",
    async (payload, thunkAPI) => {
        try {
            const data = await axios.get(`http://13.209.26.228:8080/comment/`);
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
      const res = await axios.delete(`http://13.209.26.228:8080/comment/${payload}`);
      // action의 payload 리턴
      return res.data;
    }
  );

const initialState = {
    comment: [],
    error: null,
    isLoading: false,
}

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        //댓글추가
        addComment: (state, action) => {
            state.comment.push(action.payload);
            axios.post(`http://3.37.88.29:8080/comment/${state}`, action.payload);
        }
    },
    extraReducers: {
        [__getComments.fulfilled]: (state, action) => {
          state.isLoading = false;
          state.post = action.payload;
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