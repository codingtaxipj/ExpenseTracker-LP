
import NavMenu from "@/components/Navigation/NavMenu";
import { PATH } from "@/router/routerConfig";
import { Outlet } from "react-router-dom";
const Expense = () => {
  return (
    <>
      <NavMenu activeBtn={PATH.expense}>
        <Outlet />
      </NavMenu>
    </>
  );
};

export default Expense;
