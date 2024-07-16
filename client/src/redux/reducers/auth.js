import {createSlice} from "@reduxjs/toolkit";
import Loaders from "../../component/layout/Loaders";

const initialState = {
    user: null,
    isAdmin:false,
    loader:true,
}

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
    },
    reducers:{
        userExists :(state,action) =>{
            state.user = action.payload;
            state.loader = false;
            
        },
        usernotExists :(state) =>{
            state.user = null;
            state.loader = false;

        },
    },
})

export default authSlice;
export const {userExists,usernotExists}= authSlice.actions;