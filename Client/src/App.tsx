import { MainRoute } from "./routes/MainRoute";
import { Navbar } from "./components/navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
