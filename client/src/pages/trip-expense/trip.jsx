import { PATH } from "@/router/routerConfig";
import NavMenu from "@/components/Navigation/NavMenu";
import { Outlet } from "react-router-dom";

const Trip = () => {
  return (
    <NavMenu activeBtn={PATH.trip}>
      <Outlet />
    </NavMenu>
  );
};

export default Trip;
