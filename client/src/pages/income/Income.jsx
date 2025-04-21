import { PATH } from "@/router/routerConfig";
import NavMenu from "@/components/Navigation/NavMenu";
import { Outlet } from "react-router-dom";
import SideBarIncome from "@/pages/income/SideBarIncome";
const Expense = () => {
  return (
    <>
      <NavMenu activeBtn={PATH.income}>
        <div className="relative flex h-full flex-row">
          <Outlet />
          <SideBarIncome />
        </div>
      </NavMenu>
    </>
  );
};

export default Expense;
