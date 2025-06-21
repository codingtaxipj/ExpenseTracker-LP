import { PATH } from "@/router/routerConfig";
import NavMenu from "@/components/Navigation/NavMenu";
import { Outlet } from "react-router-dom";
import SideBarIncome from "@/pages/income/SideBarIncome";
const Expense = () => {
  return (
    <>
      <NavMenu activeBtn={PATH.income}>
        <Outlet />
      </NavMenu>
    </>
  );
};

export default Expense;
