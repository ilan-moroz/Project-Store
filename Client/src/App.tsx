import { MainRoute } from "./routes/MainRoute";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        <MainRoute />
      </main>
      {/* toast to show error message */}
      <ToastContainer position={toast.POSITION.TOP_CENTER} />
    </div>
  );
}

export default App;
