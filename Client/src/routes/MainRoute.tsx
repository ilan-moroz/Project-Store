import { Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Main from "../pages/main/Main";
import Shopping from "../pages/shopping/Shopping";
import Page404 from "../pages/page404";

export const MainRoute = () => {
  return (
    <div className="MainRoute">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};
