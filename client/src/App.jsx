import { AppRouter } from "@/router/AppRouter";
import { Toaster } from "sonner";
const App = () => {
  return (
    <>
      <Toaster position="top-center" richColors /> {/* Add this line */}
      <AppRouter></AppRouter>
    </>
  );
};

export default App;
