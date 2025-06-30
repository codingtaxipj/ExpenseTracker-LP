import Form from "./Form";
import { PATH } from "@/router/routerConfig";
const ExpenseForm = () => {
  return <Form isExpense formToDisplay={PATH.addExpense} />;
};

export default ExpenseForm;
