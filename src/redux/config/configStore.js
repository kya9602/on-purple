import { configureStore } from "@reduxjs/toolkit";
import profile from "../modules/profile";
import detailSlice from "../modules/mypage";
import post from "../modules/board"
import comment from "../modules/comment";
const store = configureStore({
    reducer: {
        profile,
        post,
        comment,
        mypage: detailSlice.actions,

    }
})

export default store;