import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __getReports = createAsyncThunk(
    "GET_REPORTS",
    async (payload, thunkAPI) => {
        try {
            const data = await axios.get(`${process.env.REACT_APP_HOST}/report`);
            return thunkAPI.fulfillWithValue(data.data.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.code);
        }
    }
);

export const __getReportsDetail = createAsyncThunk(
    "GET_REPORTS_DETAIL",
    async (payload, thunkAPI) => {
      try {
        const data = await axios.get(`${process.env.REACT_APP_HOST}/report/${payload}`);
        
        return thunkAPI.fulfillWithValue(data.data.data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.code);
      }
    }
  );

const initialState = {
    report: [],
    detail: {
      reportId: 0,
      nickname: "",
      title: "",
      content: "",
      imageUrl: "",
      likes: 0,
      createdAt: [],
      modifiedAt: [],
      category: "",
      view:0,
    },
    error: null,
    isLoading: false,
  }
  
  export const reportSlice = createSlice({
    name: "report",
    initialState,
    reducers: {
    },
    extraReducers: {
        [__getReports.fulfilled]: (state, action) => {
          state.isLoading = false;
          state.report = action.payload;
        },
        [__getReports.rejected]: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
        [__getReports.pending]: (state) => {
          state.isLoading = true;
          
        },
        [__getReportsDetail.fulfilled]: (state, action) => {
          state.isLoading = false;
          state.detail= action.payload;
        },
        [__getReportsDetail.rejected]: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
        [__getReportsDetail.pending]: (state) => {
          state.isLoading = true; 
        }
    }})
export default reportSlice.reducer;