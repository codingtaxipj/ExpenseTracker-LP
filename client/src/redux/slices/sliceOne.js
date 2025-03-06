import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  val: 0,
};
export const sliceOne = createSlice({
  name: "SO",
  initialState,
  reducers: {
    inc: (state) => {
      state.val += 1;
    },
  },
});

export const { inc } = sliceOne.actions;

export default sliceOne.reducer;
