import { AppRouter } from "@/router/AppRouter";
import { useSelector } from "react-redux";
const App = () => {
  const data = useSelector((state) => state.expense.data);

  console.log(data);

  return <AppRouter></AppRouter>;
};

export default App;
