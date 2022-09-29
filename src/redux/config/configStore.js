import { configureStore } from "@reduxjs/toolkit";
import profile from "../modules/profile";
import detailSlice from "../modules/mypage";
import post from "../modules/board"

const store = configureStore({
    reducer: {
        profile,
        post,
        mypage: detailSlice.actions,

    }
})

export default store;