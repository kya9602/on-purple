import { configureStore } from "@reduxjs/toolkit";
import profile from "../modules/profile";
import detailSlice from "../modules/post"

const store = configureStore({
    reducer: {
        profile,
        mypage: detailSlice.actions,


    }
})

export default store;