import { AppRouter } from "@/router/appRouter";
import { useSelector, useDispatch } from 'react-redux';
const App = () => {  
  const data = useSelector((state) => state.expense.data);
  const dispatch = useDispatch();

  console.log(data);
  

  return <AppRouter></AppRouter>
};



export default App;
