import Income_Expense_Form from "./Income_Expense_Form";
import { navVars } from "../../global/global-variables";
const ExpenseForm = () => {
  return (
    <>
      <div className="bg-white flex grow flex-col items-center justify-center rounded-[20px]">
        <Income_Expense_Form formToDisplay={navVars.ADD_EXPENSE} />
      </div>
    </>
  );
};

export default ExpenseForm;
