import SideBarExpense from "@/pages/expense/SideBarExpense";
import NavMenu from "@/components/Navigation/NavMenu";
import { PATH } from "@/router/routerConfig";
import { Outlet } from "react-router-dom";
const Expense = () => {
  return (
    <>
      <NavMenu activeBtn={PATH.expense}>
        <div className="relative flex h-full flex-row">
          <Outlet />
          <SideBarExpense />
        </div>
      </NavMenu>
    </>
  );
};

export default Expense;
