import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  fullName: null,
  userName: null,
  userEmail: null,
  userID: null,
  userToken: null,
};
const authUser = createSlice({
  name: "user",
  initialState,
  reducers: {
    setOnLogin: (state, action) => {
      state.fullName = action.payload.firstName + "" + action.payload.lastName;
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userID = action.payload.userID;
      state.token = action.payload.jwtToken;
    },
    setOnLogout: (state) => {
      state.fullName = null;
      state.userName = null;
      state.userEmail = null;
      state.userID = null;
      state.token = null;
    },
  },
});
export const { setOnLogin, setOnLogout } = authUser.actions;
export default authUser.reducer;
