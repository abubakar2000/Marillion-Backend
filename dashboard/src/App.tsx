import { ToastContainer } from "react-toastify";
import "./App.css";
import { AppRouter } from "./routers/AppRouter";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer />
      <AppRouter />
    </div>
  );
}

export default App;
