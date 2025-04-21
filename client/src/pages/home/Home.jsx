import NavMenu from "@/components/Navigation/NavMenu";
import { Outlet } from "react-router-dom";
import SideBarHome from "@/pages/home/SideBarHome";
import { PATH } from "@/router/routerConfig";

const Home = () => {
  return (
    <>
      <NavMenu activeBtn={PATH.home}>
        <div className="flex h-full flex-row">
          <Outlet />
          <SideBarHome />
        </div>
      </NavMenu>
    </>
  );
};

export default Home;
