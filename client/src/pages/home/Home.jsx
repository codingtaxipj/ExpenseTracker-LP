import NavMenu from "@/components/Navigation/NavMenu";
import { Outlet } from "react-router-dom";
import SideBarHome from "@/pages/home/SideBarHome";
import { PATH } from "@/router/routerConfig";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllData } from "@/redux/slices/userExpenseData.js";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllData()); // Fetch expense data on mount
  }, [dispatch]);

  const data = useSelector((state) => state.expense.data);
  console.log(data);

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
