import { Routes, Route, Navigate } from "react-router";
import { navVars } from "./global/global-variables";
import Home_Index from "./components/home-page/Home_Index";
//import HOME from "./routes/Home";
import Expense_Form from "./components/Forms/Expense_Form";
import Income_Form from "./components/Forms/Income_Form";
import Categories_and_Icons from "./routes/Categories_and_Icons";
import Expense from "./routes/Expense";
import Income from "./routes/Income";
import Expense_Index from "./components/expense-page/Expense_Index";
import Income_Index from "./components/income-page/Income_Index";
import PopupEntryView from "./routes/Popup_Entry_View";
import Elements from "./routes/Elements";
import Login from "./routes/Login";
const App = () => {
  return (
    <Routes>
      {/* ----------------------- *ANCHOR base redirect HOME ---------------------- */}
      <Route path="/" element={<Navigate to={"/" + navVars.HOME} />}></Route>
      {/* ----------------------- *NOTE ##END: base redirect HOME ---------------------- */}

      {/* ----------------------- *ANCHOR Home Page Routes ---------------------- */}
      <Route path={"/" + navVars.HOME} element={<Login />}>
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
        {/* EXPENSE defalult page */}
        <Route index element={<Expense_Index></Expense_Index>}></Route>
        {/* EXPENSE add Expense page */}
        <Route
          path={navVars.ADD_EXPENSE}
          element={<Expense_Form></Expense_Form>}
        ></Route>
      </Route>
      {/* ----------------------- *NOTE ##END: EXPENSES Page ---------------------- */}

      {/* ----------------------- *ANCHOR INCOME Page ---------------------- */}
      <Route path={"/" + navVars.INCOME} element={<Income></Income>}>
        {/* INCOME defalult page */}
        <Route index element={<Income_Index></Income_Index>}></Route>
        {/* INCOME add Income page */}
        <Route
          path={navVars.ADD_INCOME}
          element={<Income_Form></Income_Form>}
        ></Route>
      </Route>
      {/* ----------------------- *NOTE ##END: INCOME Page ---------------------- */}

      {/* ----------------------- *ANCHOR All Categories Page ---------------------- */}
      <Route
        path={"/" + navVars.ALL_CATEGORIES}
        element={<Categories_and_Icons></Categories_and_Icons>}
      ></Route>
      {/* ----------------------- *NOTE ##END: All Categories Page ---------------------- */}

      {/* ----------------------- *ANCHOR All Categories Page ---------------------- */}
      <Route
        path={"/" + navVars.POPUP_VIEW}
        element={<PopupEntryView></PopupEntryView>}
      ></Route>
      {/* ----------------------- *NOTE ##END: All Categories Page ---------------------- */}

      {/* ----------------------- *ANCHOR Elements Page ---------------------- */}
      <Route
        path={"/" + navVars.ELEMENTS}
        element={<Elements></Elements>}
      ></Route>
      {/* ----------------------- *NOTE ##END: Elements Page ---------------------- */}
    </Routes>
    /* ----------------------- * ANCHOR END ROUTES PARENT BODY ---------------------- */
  );
};

export default App;
