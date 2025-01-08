import NavMenu from "../components/Navigation/NavMenu";
import { navVars } from "../global/global-variables";
import Sidebar_Dashboard from "../components/home-page/SideBar_home";
import { Outlet } from "react-router";

const HOME = () => {
  return (
    <>
      <NavMenu activeBtn={navVars.HOME}>
        <div className="relative flex h-full flex-row">
          <Outlet />
          <Sidebar_Dashboard></Sidebar_Dashboard>
        </div>
      </NavMenu>
    </>
  );
};

export default HOME;
