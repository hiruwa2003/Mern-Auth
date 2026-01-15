import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    loading: false,
    error: false,
 };

 const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
        SigninStart: (state) => { 
            state.loading = true;          
        },
        SigninSuccess: (state, action) => { 
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        SigninFailure: (state, action) => { 
            state.loading = false;
            state.error = action.payload;
        },
        Signout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
    }
});

export const { SigninStart, SigninSuccess, SigninFailure, Signout } = userSlice.actions;
export default userSlice.reducer;