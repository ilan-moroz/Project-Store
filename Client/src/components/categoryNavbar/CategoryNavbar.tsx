import { NavLink } from "react-router-dom";
import { useCategory } from "../../hooks/useCategory";
import { Category } from "../../models/Category";
import "./categoryNavbar.css";

const CategoryNavbar = () => {
  // get all categories from a custom hook
  const catagories = useCategory();

  return (
    <div className="categoryNavbar">
      {catagories.map((category: Category) => (
        <div className="category" key={category._id}>
          <NavLink to="#" className="category__link">
            {category.categoryName}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default CategoryNavbar;
