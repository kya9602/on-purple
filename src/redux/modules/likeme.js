import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

//user info 정보 불러오기
export const __getLikeme = createAsyncThunk(

    "user/like",
    async (payload, thunkAPI) => {
        try {
            const data = await axios.get(`${process.env.REACT_APP_HOST}/user/like`,
                {
                    headers: {
                        "Authorization": localStorage.getItem("Authorization"),   //accesstoken
                        "RefreshToken": localStorage.getItem("RefreshToken"),
                    }
                });
            console.log(data.data.data)
            return thunkAPI.fulfillWithValue(data.data.data);
        } catch (error) {

            return thunkAPI.rejectWithValue(error.code.data);
        }

    });


const initialState = {

    likeme: [],
    error: null,
    isLoading: false,
}

export const likemeSlice = createSlice({
    name: "likeme",
    initialState,
    reducers: {

    },
    extraReducers: {

        [__getLikeme.fulfilled]: (state, action) => {
            state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
            state.likeme = action.payload;
            // console.log("action is ", action.payload)
        },
        [__getLikeme.pending]: (state) => {
            state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__getLikeme.rejected]: (state, action) => {
            state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
            state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },



    }
})

export const { likeme } = likemeSlice.actions;
export default likemeSlice;

