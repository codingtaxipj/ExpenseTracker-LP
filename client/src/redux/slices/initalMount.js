import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFirstCallMade: false,
};

const initalMount = createSlice({
  name: "initalMount",
  initialState,
  reducers: {
    updateFirstCall(state, action) {
      state.isFirstCallMade = action.payload;
    },
  },
});

export const { updateFirstCall } = initalMount.actions;
export default initalMount.reducer;
