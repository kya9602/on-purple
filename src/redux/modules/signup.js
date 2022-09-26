import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

export const __SignUp = createAsyncThunk(
    "api/member/signup",
    async (payload, thunkAPI) => {
        try {
            console.log(payload)
            const data =  await axios.post('http://3.37.88.29:8080/user/signup', payload);
            console.log(data.data)
            return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
            return thunkAPI.rejectWithValue(error);
          }
    }
  );



export const member = createSlice({
        name:"member",
        initialState: {
        userdatas:[],
        success:false,
        isLoading: false,
        error: null,
      },

    reducers:{
        createUserData(state, action){
          /* state.member.push(action.payload);
          axios.post('http://13.125.24.153/api/member/signup', action.payload )
          console.log()
          //axios.post('http://localhost:3001/userdatas', action.payload ); */
        },
    },

    extraReducers: {},
})

export let {createUserData} = member.actions;

export default member.reducer;