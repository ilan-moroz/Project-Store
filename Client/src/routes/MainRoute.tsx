import { Route, Routes } from "react-router-dom";
import { Main } from "../pages/main/Main";
import { Register } from "../pages/Register";

export const MainRoute = () => {
  return (
    <div className="MainRoute">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="*" element={<Page404 />} /> */}
      </Routes>
    </div>
  );
};
