import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//채팅방 목록 조회
export const __getChatrooms = createAsyncThunk(
  "GET_CHATROOMS",
  async (_, thunkAPI) => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_HOST}/chat/room`);
      console.log(data)
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



const initialState = {
  roomlist: [],
};

export const chatroom = createSlice({
  name: "chatroom",
  initialState,
  reducers: {},

  extraReducers: {
    [__getChatrooms.pending]: (state) => {
      state.isLoading = true;
    },
    [__getChatrooms.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.roomlist = action.payload;
      console.log(action)
    },
    [__getChatrooms.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
});


export default chatroom.reducer;