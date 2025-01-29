import { Toaster } from "react-hot-toast";
import RoutesPage from "./routes/routes";

function App() {
  return (
    <>
      <RoutesPage></RoutesPage>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
