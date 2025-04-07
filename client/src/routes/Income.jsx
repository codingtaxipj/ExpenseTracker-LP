import SideBarIncome from "../components/income-page/SideBar_Income";
import NavMenu from "../components/Navigation/NavMenu";
import { navVars } from "../global/global-variables";
import { Outlet } from "react-router";
const Expense = () => {
  return (
    <>
      <NavMenu activeBtn={navVars.INCOME}>
        <div className="relative flex h-full flex-row">
          <Outlet />
          <SideBarIncome />
        </div>
      </NavMenu>
    </>
  );
};

export default Expense;
