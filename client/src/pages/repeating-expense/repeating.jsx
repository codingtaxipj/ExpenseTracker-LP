import { PATH } from "@/router/routerConfig";
import NavMenu from "@/components/Navigation/NavMenu";
import { Outlet } from "react-router-dom";
const Repeating = () => {
  return (
    <NavMenu activeBtn={PATH.repeat}>
      <Outlet />
    </NavMenu>
  );
};

export default Repeating;
