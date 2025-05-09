import NavMenu from "@/components/Navigation/NavMenu";
import { Outlet } from "react-router-dom";
import SideBarHome from "@/pages/home/SideBarHome";
import { PATH } from "@/router/routerConfig";
import useInitalReduxLoad from "@/components/useInitalReduxLoad.js";
import { useEffect, useState } from "react";

const Home = () => {
  const [loading, setLoading] = useState(true); // Loading state
  const { incomingData } = useInitalReduxLoad();
  useEffect(() => {
    if (incomingData) setLoading(false);
  }, [incomingData]);

  return (
    <>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          Loading...
        </div>
      )}
      {!loading && (
        <NavMenu activeBtn={PATH.home}>
          <div className="flex h-full flex-row">
            <Outlet />
            <SideBarHome />
          </div>
        </NavMenu>
      )}
    </>
  );
};

export default Home;
