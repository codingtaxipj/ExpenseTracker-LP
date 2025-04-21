import NavMenu from "../components/Navigation/NavMenu";
import { navVars } from "../global/global-variables";
import { Outlet } from "react-router";

import Sidebar_Dashboard from "../components/home-page/SideBar_home";

const Home = () => {
  return (
    <>
      <NavMenu activeBtn={navVars.HOME}>
        <div className="flex h-full flex-row">
          <Outlet />
          <Sidebar_Dashboard></Sidebar_Dashboard>
        </div>
      </NavMenu>
    </>
  );
};

export default Home;
