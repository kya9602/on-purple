import { createAsyncThunk, } from "@reduxjs/toolkit";
import axios from 'axios';




export const __checkUsername = createAsyncThunk(
    "data/checkId",
    async (payload, thunkAPI) => {
        try {
            console.log(payload);
            const data = await axios.post(`http://3.37.88.29:8080/user/idCheck/${payload}`);
            console.log(data);
            if (data.data.success === false)
                alert(data.data.error.message);
            else alert("사용 가능한 아이디입니다.");
            return thunkAPI.fulfillWithValue(data.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }


    }
);


export const __checkNickname = createAsyncThunk(
    "data/checkId",
    async (payload, thunkAPI) => {
        try {
            console.log(payload);
            const data = await axios.post(`http://3.37.88.29:8080/user/nickname/${payload}`);
            console.log(data);
            if (data.data.success === false)
                alert(data.data.error.message);
            else alert("사용 가능한 아이디입니다.");
            return thunkAPI.fulfillWithValue(data.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }


    }
);