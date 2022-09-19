import { configureStore } from "@reduxjs/toolkit";
import profile from "../modules/profile";

const store = configureStore({
    reducer:{
        profile,
        

        
    }
})

export default store;