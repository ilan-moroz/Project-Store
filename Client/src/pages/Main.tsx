import { About } from "../components/About";
import { Info } from "../components/Info";
import { Login } from "../components/Login";
import "../styles/main.css";

export const Main = () => {
  return (
    <div className="Main">
      <main>
        <Login />
      </main>
      <section>
        <About />
      </section>
      <aside>
        <Info />
      </aside>
    </div>
  );
};
