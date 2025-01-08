import { Routes, Route, Navigate } from "react-router";
import { navVars } from "./global/global-variables";
import Home_Index from "./components/home-page/Home_Index";
import HOME from "./routes/Home";
import Expense_Form from "./components/Forms/Expense_Form";
import Income_Form from "./components/Forms/Income_Form";

const App = () => {
  return (
    <Routes>
      {/* ----------------------- *ANCHOR base redirect HOME ---------------------- */}
      <Route path="/" element={<Navigate to={navVars.HOME} />}></Route>
      {/* ----------------------- END ---------------------- */}

      {/* ----------------------- *NOTE DASHBOARD Routes ---------------------- */}
      <Route path={navVars.HOME} element={<HOME />}>
        {/* HOME defalult page */}
        <Route index element={<Home_Index></Home_Index>}></Route>
        {/* HOME add Expense page */}
        <Route
          path={navVars.ADD_EXPENSE}
          element={<Expense_Form></Expense_Form>}
        ></Route>
        {/* HOME add Income page */}
        <Route
          path={navVars.ADD_INCOME}
          element={<Income_Form></Income_Form>}
        ></Route>
      </Route>

      {/* ----------------------- END ---------------------- */}
    </Routes>
    /* ----------------------- * ANCHOR END ROUTES PARENT BODY ---------------------- */
  );
};

export default App;
