import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    storeSignUpInfo: (state, action) => {
      return action.payload;
    },
    storeloginInfo: (state, action) => {
      return action.payload;
    },
    updateProfile: (state, action) => {
      if (state) {
        return { ...state, ...action.payload };
      }
      return state; // Return current state instead of undefined
    },
  },
});

export const { storeSignUpInfo, storeloginInfo, updateProfile } =
  userSlice.actions;

export default userSlice.reducer;
