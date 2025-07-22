import { AppRouter } from "@/router/AppRouter";
import { Toaster } from "sonner";
import UseInitalLoad from "./hooks/useInitalLoad";

const App = () => {
  UseInitalLoad();
  return (
    <>
      <Toaster position="top-center" richColors /> {/* Add this line */}
      <AppRouter></AppRouter>
    </>
  );
};

export default App;
