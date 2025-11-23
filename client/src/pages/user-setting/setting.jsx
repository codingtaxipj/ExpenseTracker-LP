import NavMenu from "@/components/Navigation/NavMenu";
import { Outlet } from "react-router-dom";
import { PATH } from "@/router/routerConfig";

const Setting = () => {
  return (
    <>
      <NavMenu activeBtn={PATH.setting}>
        <Outlet />
      </NavMenu>
    </>
  );
};

export default Setting;
