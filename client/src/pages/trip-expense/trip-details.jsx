import useTripConfig from "@/hooks/useTripConfig";

import { useParams } from "react-router-dom";

const TripDetails = () => {
  const { getTripDetails } = useTripConfig();
  const { tripid } = useParams();
  const trip = getTripDetails(tripid);

  return <>{trip._id}</>;
};

export default TripDetails;
