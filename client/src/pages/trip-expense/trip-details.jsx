import EButton from "@/components/buttons/eButton";
import { TravelType, TripType } from "@/global/globalVariables";
import useTripConfig from "@/hooks/useTripConfig";
import { PATH } from "@/router/routerConfig";

import { useNavigate, useParams } from "react-router-dom";

const TripDetails = () => {
  const navigate = useNavigate();
  const { getTripDetails } = useTripConfig();
  const { tripid } = useParams();
  const trip = getTripDetails(tripid);

  return (
    <>
      {trip._id}
      <EButton
        onClick={() => navigate(PATH.addTripExpense)}
        addTrip
        isTextIcon
      />
    </>
  );
};

export default TripDetails;
