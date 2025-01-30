import SideBarExpense from "../components/expense-page/SideBar_Expense";
import NavMenu from "../components/Navigation/NavMenu";
import { navVars } from "../global/global-variables";
import { Outlet } from "react-router";
const Expense = () => {
  return (
    <>
      <NavMenu activeBtn={navVars.EXPENSE}>
        <div className="relative flex h-full flex-row">
          <Outlet />
          <SideBarExpense />
        </div>
      </NavMenu>
    </>
  );
};

export default Expense;
