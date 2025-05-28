import Income_Expense_Form from "./Form";
import { PATH } from "@/router/routerConfig";
const ExpenseForm = () => {
  return (
    <>
      <div className="bg-darkBlack flex w-full grow flex-col items-center justify-center rounded-[20px] px-[4rem] py-[2.5rem]">
        <Income_Expense_Form formToDisplay={PATH.addExpense} />
      </div>
    </>
  );
};

export default ExpenseForm;
