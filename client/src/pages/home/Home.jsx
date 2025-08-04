import NavMenu from "@/components/Navigation/NavMenu";
import { Outlet } from "react-router-dom";
import { PATH } from "@/router/routerConfig";

const Home = () => {
  return (
    <>
      <NavMenu activeBtn={PATH.home}>
        <Outlet />
      </NavMenu>
    </>
  );
};

export default Home;
