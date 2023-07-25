import { About } from "../components/About";
import { Info } from "../components/Info";
import "../styles/main.css";

export const Main = () => {
  return (
    <div className="Main">
      <main>main</main>
      <section>
        <About />
      </section>
      <aside>
        <Info />
      </aside>
    </div>
  );
};
