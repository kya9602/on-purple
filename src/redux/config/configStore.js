import { configureStore } from "@reduxjs/toolkit";
import profile from "../modules/profile";
import detailSlice from "../modules/mypage";
import logout from "../modules/user";
import post from "../modules/board"
import comment from "../modules/comment";
import main from "../modules/main";

const store = configureStore({
    reducer: {
        profile,
        post,
        comment,
        mypage: detailSlice.actions,
        logout
        main,

    }
})

export default store;