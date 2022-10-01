import { configureStore } from "@reduxjs/toolkit";
import profile from "../modules/profile";
import detailSlice from "../modules/mypage";
import post from "../modules/board";
import logout from "../modules/user";

const store = configureStore({
    reducer: {
        profile,
        post,
        mypage: detailSlice.actions,
        logout
    }
})

export default store;