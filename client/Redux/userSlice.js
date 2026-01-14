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
    }
});

export const { SigninStart, SigninSuccess, SigninFailure } = userSlice.actions;
export default userSlice.reducer;