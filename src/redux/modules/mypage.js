import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

//user info 정보 불러오기
export const __getMypage = createAsyncThunk(

    "data/Mypage",
    async (payload, thunkAPI) => {
        try {
            const data = await axios.get(`${process.env.REACT_APP_HOST}/mypage/${payload}`,
                {
                    headers: {
                        "Authorization": localStorage.getItem("Authorization"),   //accesstoken
                        "RefreshToken": localStorage.getItem("RefreshToken"),
                    }
                });
            return thunkAPI.fulfillWithValue(data.data);
        } catch (error) {

            return thunkAPI.rejectWithValue(error.code);
        }

    });


const initialState = {

    mypage: {
        profileId: 0,
        nickname: "",
        imageUrl: "",
        imageList: null,
        age: "",
        mbti: "",
        introduction: "",
        idealType: "",
        job: "",
        hobby: "",
        drink: "",
        pet: "",
        smoke: "",
        likeMovieType: "",
        area: "",
        //나를 좋아요한사람 목록
        likedResponseDtoList: [],
        //매칭된사람 목록
        otherLikeResponseDtoList: []
    },
    error: null,
    isLoading: false,
}

export const detailSlice = createSlice({
    name: "mypage",
    initialState,
    reducers: {

    },
    extraReducers: {

        [__getMypage.fulfilled]: (state, action) => {
            state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
            state.mypage = action.payload;
        },
        [__getMypage.pending]: (state) => {
            state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__getMypage.rejected]: (state, action) => {
            state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
            state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },



    }
})

export const { updatePost } = detailSlice.actions;
export default detailSlice;

