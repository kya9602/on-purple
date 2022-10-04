import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';



export const __getDetail = createAsyncThunk(
    "data/getDetail",
    async (payload, thunkAPI) => {
        console.log("payload is ", payload)
        try {
            const data = await axios.get(`${process.env.REACT_APP_HOST}/profile/${payload}`,
                {
                    headers: {
                        "Authorization": localStorage.getItem("Authorization"),   //accesstoken
                        "RefreshToken": localStorage.getItem("RefreshToken"),
                    }
                });
            console.log(data);
            return thunkAPI.fulfillWithValue(data.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.code);
        }
    }
);

const initialState = {
    data: {
        profileId: "",
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
        area: ""
    },
    isLoading: false,
    error: null,
};

export const detailSlice = createSlice({

    name: "data",
    initialState,
    reducers: {
        // updatePost: (state, action) => {
        //     console.log(action.payload)
        //     //     let index = state.data.findIndex(post => post.postId === action.payload.id);
        //     //     state.data.splice(index, 1, action.payload);
        //     state.data.data = action.payload
        // }
    },
    extraReducers: {
        [__getDetail.pending]: (state) => {
            state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__getDetail.fulfilled]: (state, action) => {
            state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
            state.data = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
        },
        [__getDetail.rejected]: (state, action) => {
            state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
            state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
    }
});

export const { updatePost } = detailSlice.actions;
export default detailSlice;