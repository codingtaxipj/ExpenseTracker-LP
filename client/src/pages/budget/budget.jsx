import { PATH } from "@/router/routerConfig";
import NavMenu from "@/components/Navigation/NavMenu";
import { Outlet } from "react-router-dom";
const Budget = () => {
  return (
    <NavMenu activeBtn={PATH.budget}>
      <Outlet />
    </NavMenu>
  );
};

export default Budget;
