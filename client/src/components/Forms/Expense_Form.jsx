import Income_Expense_Form from "./Form";
import { navVars } from "../../global/global-variables";
const ExpenseForm = () => {
  return (
    <>
      <div className="flex w-[70%] grow flex-col items-center justify-center rounded-[20px] bg-white px-[4rem] py-[2.5rem]">
        <Income_Expense_Form formToDisplay={navVars.ADD_EXPENSE} />
      </div>
    </>
  );
};

export default ExpenseForm;
