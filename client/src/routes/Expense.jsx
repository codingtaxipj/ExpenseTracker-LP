import NavMenu from "../components/Navigation/NavMenu";
import { navVars } from "../global/global-variables";
import { Outlet } from "react-router";
const Expense = () => {
  return (
    <>
      <NavMenu activeBtn={navVars.EXPENSE}>
        <div className="relative flex h-full flex-row">
          <Outlet />          
        </div>
      </NavMenu>
    </>
  );
};

export default Expense;
