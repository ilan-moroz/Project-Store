import Info from "../../components/Info";
import About from "../../components/about/About";
import { Login } from "../../components/login/Login";
import "./main.css";

const Main = () => {
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

export default Main;
