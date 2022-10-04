import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
      const res = await axios.delete(`${process.env.REACT_APP_HOST}/comment/${payload}`,{
        headers: {
          "Authorization": localStorage.getItem("Authorization"),
          "RefreshToken": localStorage.getItem("RefreshToken")
        }
      });
      if(res.data.success === true) {
        window.alert("댓글이 삭제되었습니다")
      }
      return res.data;
    }
  );

const initialState = {  
    comment:[],
    error: null,
    isLoading: false,
}

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
      createComment(state, action){
        state.comment.data.push(action.payload)
      },
      /* updataComment: (state, action) => {
      axios.put(`${process.env.REACT_APP_HOST}/comment/${action.payload.commentId}`, action.payload)
    }
 */
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
          let index = state.comment.data.findIndex(
            (comment) => comment.id === action.payload
          );
         /*  console.log(index); */
          state.comment.data.splice(index, 1);
        },
        [__deleteComments.rejected]: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
        [__deleteComments.pending]: (state, action) =>{
           state.isLoading =false;
        }
}})

export const { createComment, updataComment } = commentSlice.actions;
export default commentSlice.reducer;