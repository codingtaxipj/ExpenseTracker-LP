import { AppRouter } from "@/router/AppRouter";
import { Toaster } from "sonner";
import useInitalLoad from "./hooks/useInitalLoad";

const App = () => {
  useInitalLoad();
  return (
    <>
      <Toaster position="top-center" richColors /> {/* Add this line */}
      <AppRouter></AppRouter>
    </>
  );
};

export default App;
