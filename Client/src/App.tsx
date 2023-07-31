import { MainRoute } from "./routes/MainRoute";
import { Navbar } from "./components/navbar/Navbar";

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        <MainRoute />
      </main>
    </div>
  );
}

export default App;
