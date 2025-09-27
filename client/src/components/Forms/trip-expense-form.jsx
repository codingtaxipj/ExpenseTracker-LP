import { useParams } from "react-router-dom";
import Form from "./Form";

const TripExpenseForm = () => {
  const params = useParams();
  const id = params.tripid ? params.tripid : null;
  return <Form isTrip tripID={id} />;
};

export default TripExpenseForm;
