import { apiCLient } from "@/api/apiClient";
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { ArrayCheck } from "@/components/utility";

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
    // <-- userID must be passed in
    try {
      const res = await apiCLient.get(`/trip/get-trip/${userID}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

// Add a new trip
export const insertTrip = createAsyncThunk(
  "trip/insertTrip",
  async ({ data }, { rejectWithValue }) => {
    try {
      // Your server's /add-trip endpoint must return the newly created trip object
      const res = await apiCLient.post(`/trip/add-trip`, data);
      return res.data;
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
      })
      .addCase(insertTrip.fulfilled, (state, action) => {
        state.CreateTripLoading = false;
        // action.payload is the new trip object from the server.
        // Add it to the beginning of the TripData array.
        if (state.TripData) {
          state.TripData.unshift(action.payload);
        } else {
          state.TripData = [action.payload];
        }
      })
      .addCase(insertTrip.rejected, (state, action) => {
        state.CreateTripLoading = false;
        state.CreateTripError = action.payload;
      });
  },
});

export default trip.reducer;

// ====================================================================
// ? ++ MEMOIZED SELECTORS for Trips ++
// ====================================================================

const selectTripState = (state) => state.trip;

export const selectRawTripData = createSelector(
  [selectTripState],
  (trip) => trip.TripData,
);

// This selector replaces your useMemo block
export const selectTripList = createSelector(
  [selectRawTripData],
  (data) => ArrayCheck(data) || [],
);
