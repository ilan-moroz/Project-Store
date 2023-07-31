import { About } from "../../components/about/About";
import { Info } from "../../components/Info";
import { Login } from "../../components/login/Login";
import "./main.css";

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
