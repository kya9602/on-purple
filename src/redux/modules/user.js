import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import instance from "../../shared/api";


export const setUserDB = createAsyncThunk("setUserImage", async () => {
    try {
        const response = await instance.get("/api/user/userInfo");
        const userInfo = response.data;
        return { userInfo };
    } catch (error) {
        console.log(error);
    }
});


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
            const data = await axios.post(`http://3.37.88.29:8080/user/logout`, payload,
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
        user: null //user has not loged in
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