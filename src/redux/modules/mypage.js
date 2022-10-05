import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const __getMypage = createAsyncThunk(
    "data/Mypage",
    async (payload, thunkAPI) => {
        console.log(payload)
        try {
            const data = await axios.get(`${process.env.REACT_APP_HOST}/mypage/${payload}`,
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
    data: []
    // {
    //     profileId: "",
    //     nickname: "",
    //     imageUrl: "",
    //     imageList: null,
    //     age: "",
    //     mbti: "",
    //     introduction: "",
    //     idealType: "",
    //     job: "",
    //     hobby: "",
    //     drink: "",
    //     pet: "",
    //     smoke: "",
    //     likeMovieType: "",
    //     area: "",
    //     likeResponseDtoList: []
    // }
    ,
    isLoading: false,
    error: null,
};

export const detailSlice = createSlice({

    name: "mypage",
    initialState,
    reducers: {
        updatePost: (state, action) => {
            console.log(action.payload)
            //     let index = state.data.findIndex(post => post.postId === action.payload.id);
            //     state.data.splice(index, 1, action.payload);
            state.data.data = action.payload
        }
    },
    extraReducers: {
        [__getMypage.fulfilled]: (state, action) => {
            state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
            state.data = action.payload;
            console.log("action is ", action)

            // {
            //     profileId: action.payload.data[0].profileId,
            //     nickname: action.payload.data[0].nickname,
            //     imageUrl: action.payload.data[0].imageUrl,
            //     imageList: action.payload.data[0].imageList,
            //     age: action.payload.data[0].age,
            //     mbti: action.payload.data[0].mbti,
            //     introduction: action.payload.data[0].introduction,
            //     idealType: action.payload.data[0].idealType,
            //     job: action.payload.data[0].job,
            //     hobby: action.payload.data[0].hobby,
            //     drink: action.payload.data[0].drink,
            //     pet: action.payload.data[0].pet,
            //     smoke: action.payload.data[0].smoke,
            //     likeMovieType: action.payload.data[0].likeMovieType,
            //     area: action.payload.data[0].area,
            // };
        },
        [__getMypage.pending]: (state) => {
            state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__getMypage.rejected]: (state, action) => {
            state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
            state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },


    }
});

export const { updatePost } = detailSlice.actions;
export default detailSlice.reducer;