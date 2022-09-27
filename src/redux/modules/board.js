import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __getPosts = createAsyncThunk(
    "GET_POSTS",
    async (payload, thunkAPI) => {
        try {
            const data = await axios.get(`http://13.125.24.153/api/main`);
            /* console.log(data) */
            return thunkAPI.fulfillWithValue(data.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.code);
        }
    }
);

