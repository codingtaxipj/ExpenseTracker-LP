import Form from "./Form";
import { PATH } from "@/router/routerConfig";
const IncomeForm = () => {
  return <Form isIncome formToDisplay={PATH.addIncome} />;
};

export default IncomeForm;
