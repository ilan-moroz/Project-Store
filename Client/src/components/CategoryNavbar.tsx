import { useCategory } from "../hooks/useCategory";
import { Category } from "../models/Category";

const CategoryNavbar = () => {
  const catagories = useCategory();

  return (
    <div className="categoryNavbar">
      {catagories.map((category: Category) => (
        <div key={category._id}>{category.categoryName}</div>
      ))}
    </div>
  );
};

export default CategoryNavbar;
