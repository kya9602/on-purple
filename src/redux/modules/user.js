import { createAsyncThunk, } from "@reduxjs/toolkit";
import axios from 'axios';




export const __checkUsername = createAsyncThunk(
    "data/checkUsername",
    async (payload, thunkAPI) => {
        try {
            console.log(payload);
            const data = await axios.post(`http://3.37.88.29:8080/user/idCheck/${payload.username}`);
            console.log(data);
            if (data.data.success === false)
                alert(data.data.error.message);
            else alert("사용 가능한 아이디입니다.");
            return thunkAPI.fulfillWithValue(data.data.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }


    }
);


export const __checkNickname = createAsyncThunk(
    "data/checkNickname",
    async (payload, thunkAPI) => {
        try {
            console.log(payload);
            const data = await axios.post(`http://3.37.88.29:8080/user/nicknameCheck/${payload.nickname}`);
            console.log(data);
            if (data.data.success === false)
                alert(data.data.error.message);
            else alert("사용 가능한 닉네임입니다.");
            return thunkAPI.fulfillWithValue(data.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }


    }
);


export const __logout = createAsyncThunk(
    "data/getComments",
    async (payload, thunkAPI) => {
        try {
            console.log(payload);
            const data = await axios.post(`http://3.38.192.170:8080/api/member/logout`,
                {
                    headers: {
                        "Authorization": localStorage.getItem("Authorization"),   //accesstoken
                        "RefreshToken": localStorage.getItem("RefreshToken"),
                    }
                });
        } catch (error) {
        }
    }
);