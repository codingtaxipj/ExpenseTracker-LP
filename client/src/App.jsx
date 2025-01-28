import { Routes, Route, Navigate } from "react-router";
import { navVars } from "./global/global-variables";
import Home_Index from "./components/home-page/Home_Index";
import HOME from "./routes/Home";
import Expense_Form from "./components/Forms/Expense_Form";
import Income_Form from "./components/Forms/Income_Form";
import Categories_and_Icons from "./routes/Categories_and_Icons";
import Expense from "./routes/Expense";
import Income from "./routes/Income";
import Expense_Index from "./components/expense-page/Expense_Index";

const App = () => {
  return (
    <Routes>
      {/* ----------------------- *ANCHOR base redirect HOME ---------------------- */}
      <Route path="/" element={<Navigate to={"/" + navVars.HOME} />}></Route>
      {/* ----------------------- *NOTE ##END: base redirect HOME ---------------------- */}

      {/* ----------------------- *ANCHOR Home Page Routes ---------------------- */}
      <Route path={"/" + navVars.HOME} element={<HOME />}>
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
      {/* ----------------------- *NOTE ##END: Home Page Routes ---------------------- */}

      {/* ----------------------- *ANCHOR EXPENSES Page ---------------------- */}
      <Route path={"/" + navVars.EXPENSE} element={<Expense />}>
        <Route index element={<Expense_Index></Expense_Index>}></Route>
      </Route>
      {/* ----------------------- *NOTE ##END: EXPENSES Page ---------------------- */}

      {/* ----------------------- *ANCHOR INCOME Page ---------------------- */}
      <Route path={"/" + navVars.INCOME} element={<Income></Income>}></Route>
      {/* ----------------------- *NOTE ##END: INCOME Page ---------------------- */}

      {/* ----------------------- *ANCHOR All Categories Page ---------------------- */}
      <Route
        path={"/" + navVars.ALL_CATEGORIES}
        element={<Categories_and_Icons></Categories_and_Icons>}
      ></Route>
      {/* ----------------------- *NOTE ##END: All Categories Page ---------------------- */}
    </Routes>
    /* ----------------------- * ANCHOR END ROUTES PARENT BODY ---------------------- */
  );
};

export default App;
