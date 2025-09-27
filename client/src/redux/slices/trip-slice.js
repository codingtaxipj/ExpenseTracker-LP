import { apiCLient } from "@/api/apiClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  TripData: null,
  TripLoading: false,
  TripError: null,

  CreateTripLoading: false,
  CreateTripError: null,
};

const userID = 123456;
// Fetch trips
export const fetchTrips = createAsyncThunk(
  "trip/fetchTrips",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiCLient.get(`/trip/get-trip/${userID}`);
      return res.data;
    } catch (err) {
      // 'err.message' is now the clean string from our interceptor.
      return rejectWithValue(err.message);
    }
  },
);

// Add a new trip
export const insertTrip = createAsyncThunk(
  "trip/insertTrip",
  async ({ data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await apiCLient.post(`/trip/add-trip`, data);
      await dispatch(fetchTrips());
      return { success: true, message: res.data.message };
      // server responds with { message, tripData? }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const trip = createSlice({
  name: "trip",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch trips
      .addCase(fetchTrips.pending, (state) => {
        state.TripLoading = true;
        state.TripError = null;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.TripLoading = false;
        state.TripData = action.payload;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.TripLoading = false;
        state.TripError = action.payload;
      })

      // Insert trip
      .addCase(insertTrip.pending, (state) => {
        state.CreateTripLoading = true;
        state.CreateTripError = null;
      })
      .addCase(insertTrip.fulfilled, (state) => {
        state.CreateTripLoading = false;
      })
      .addCase(insertTrip.rejected, (state, action) => {
        state.CreateTripLoading = false;
        state.CreateTripError = action.payload;
      });
  },
});

export default trip.reducer;
