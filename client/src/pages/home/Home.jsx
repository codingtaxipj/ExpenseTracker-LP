import NavMenu from "@/components/Navigation/NavMenu";
import { Outlet } from "react-router-dom";

import { PATH } from "@/router/routerConfig";
import useInitalReduxLoad from "@/hooks/useInitalReduxLoad.js";
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
          <Outlet />
        </NavMenu>
      )}
    </>
  );
};

export default Home;
