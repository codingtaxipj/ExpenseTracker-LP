import { apiCLient } from "@/api/apiClient";

import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";

import userPlaceholderImage from "@/assets/user/user-placeholder.jpg";

const initialState = {
  profileImageUrl: userPlaceholderImage,
  loading: false,
  error: null,
};

export const setProfileImage = createAsyncThunk(
  "user/setProfileImage",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const res = await apiCLient.post(`/users/avatar-upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

  

      return res.data;
    } catch (err) {
      // Use rejectWithValue to pass the error message to the reducer.
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

const user = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.profileImageUrl = action.payload.url;
      })
      .addCase(setProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default user.reducer;
