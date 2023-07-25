import { BrowserRouter } from "react-router-dom";
import { MainRoute } from "./routes/MainRoute";
import { Navbar } from "./components/navbar/Navbar";

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        <BrowserRouter>
          <MainRoute />
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
