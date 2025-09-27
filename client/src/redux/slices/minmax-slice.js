import { apiCLient } from "@/api/apiClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  MinMaxData: null,
  MinMaxLoading: false,
  MinMaxError: null,
};

const userID = 123456;

export const fetchMM = createAsyncThunk(
  "budget/fetchMM",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiCLient.get(`/minmax/get-data/${userID}`);
      return res.data;
    } catch (err) {
      // 'err.message' is now the clean string from our interceptor.
      return rejectWithValue(err.message);
    }
  },
);

const MinMax = createSlice({
  name: "MM",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMM.pending, (state) => {
        state.MinMaxLoading = true;
        state.MinMaxError = null;
      })
      .addCase(fetchMM.fulfilled, (state, action) => {
        state.MinMaxLoading = false;
        state.MinMaxData = action.payload;
      })
      .addCase(fetchMM.rejected, (state, action) => {
        state.MinMaxLoading = false;
        state.MinMaxError = action.payload;
      });
  },
});

export default MinMax.reducer;
