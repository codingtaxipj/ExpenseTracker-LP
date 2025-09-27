import { ArrayCheck } from "@/components/utility";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const useTripConfig = () => {
  const {
    TripData,
    TripLoading,
    TripError,
    CreateTripLoading,
    CreateTripError,
  } = useSelector((state) => state.trip);

  const TripList = useMemo(() => ArrayCheck(TripData), [TripData]);

  const getTripDetails = (id) => TripList?.find((t) => t._id === id) ?? [];

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
