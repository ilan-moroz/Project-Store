import { NavLink } from "react-router-dom";
import { useCategory } from "../../hooks/useCategory";
import { Category } from "../../models/Category";
import "./categoryNavbar.css";

const CategoryNavbar = () => {
  const catagories = useCategory();

  return (
    <div className="categoryNavbar">
      {catagories.map((category: Category) => (
        <div className="category">
          <NavLink to="#" className="category__link" key={category._id}>
            {category.categoryName}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default CategoryNavbar;
