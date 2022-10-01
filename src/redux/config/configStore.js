import { configureStore } from "@reduxjs/toolkit";
import profile from "../modules/profile";
import detailSlice from "../modules/mypage";
import post from "../modules/board"
import main from "../modules/main";

const store = configureStore({
    reducer: {
        profile,
        post,
        mypage: detailSlice.actions,
        main,

    }
})

export default store;