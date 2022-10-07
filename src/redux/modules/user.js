import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


export const __checkUsername = createAsyncThunk(
    "data/checkUsername",
    async (payload, thunkAPI) => {
        try {
            console.log(payload);
            const data = await axios.post(`${process.env.REACT_APP_HOST}/user/idCheck/${payload.username}`);
            console.log(data.data);
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
    "data/checkNickname",
    async (payload, thunkAPI) => {
        try {
            console.log(payload);
            const data = await axios.post(`${process.env.REACT_APP_HOST}/user/nicknameCheck/${payload.nickname}`);
            console.log(data.data);
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
            const data = await axios.post(`${process.env.REACT_APP_HOST}/user/logout`, payload,
                {
                    headers: {
                        "Authorization": localStorage.getItem("Authorization"),   //accesstoken
                        "RefreshToken": localStorage.getItem("RefreshToken"),
                    }
                });
        } catch (error) {
            console.log('로그아웃 실패')
        }
    }
);



export const userSlice = createSlice({

    name: "user",
    initialState: {
        user: null
    },
    reducers: {

        logout(state) {
            localStorage.removeItem("Authorization")   //로그아웃은 token, username 제거
            localStorage.removeItem("RefreshToken")
            localStorage.removeItem("nickname")
        }
    },


});



export const { logout } = userSlice.actions;
export default userSlice.reducer;