import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSuccess:(state,action)=>{
      state.currentUser=action.payload;

    },
    deleteUserSuccess:(state,)=>{
      state.currentUser=null;
    },
    signoutUserSuccess:(state)=>{
      state.currentUser=null;

    }
  },
});

export const { signInStart, signInSuccess, signInFailure,updateSuccess,deleteUserSuccess,signoutUserSuccess } = userSlice.actions;

export default userSlice.reducer;
