import { useSelector } from "react-redux";
import { selectTripList } from "@/redux/slices/trip-slice";

const useTripConfig = () => {
  const TripList = useSelector(selectTripList);
  const { TripLoading, TripError, CreateTripLoading, CreateTripError } =
    useSelector((state) => state.trip);

  // This helper function is still useful, so we keep it.
  const getTripDetails = (id) => TripList?.find((t) => t._id === id) ?? null;

  return {
    TripList,
    getTripDetails,
    TripLoading,
    TripError,
    CreateTripLoading,
    CreateTripError,
  };
};

export default useTripConfig;
