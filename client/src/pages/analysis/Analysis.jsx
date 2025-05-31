import NavMenu from "@/components/Navigation/NavMenu";
import { PATH } from "@/router/routerConfig";
import { Outlet } from "react-router-dom";

const Analysis = () => {
  return (
    <div>
      <NavMenu activeBtn={PATH.analysis}>
        <Outlet />
      </NavMenu>
    </div>
  );
};

export default Analysis;
