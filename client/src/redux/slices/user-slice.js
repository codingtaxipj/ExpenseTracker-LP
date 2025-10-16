import { apiCLient } from "@/api/apiClient";
import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";

const initialState = {};

export const setProfileImage = createAsyncThunk(
  "user/setProfileImage",
  async ({ data }, { rejectWithValue }) => {
    try {
      const res = await apiCLient.post(`/user/set-profile-image`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const user = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default user.reducer;
ss;
