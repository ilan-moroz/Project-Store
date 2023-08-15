import React from "react";
import { useCategory } from "../../hooks/useCategory";
import { Category } from "../../models/Category";
import "./categoryNavbar.css";

type CategoryProps = {
  onSelectCategory: (Category: string) => void;
};

const CategoryNavbar: React.FC<CategoryProps> = ({ onSelectCategory }) => {
  // get all categories from a custom hook
  const catagories = useCategory();

  const [activeCategory, setActiveCategory] = React.useState<string | null>(
    null
  );

  return (
    <div className="categoryNavbar">
      {catagories.map((category: Category) => (
        <ul
          className={`category ${
            category._id === activeCategory ? "active" : ""
          }`}
          key={category._id}
          onClick={() => {
            onSelectCategory(category._id);
            setActiveCategory(category._id);
          }}
        >
          <li className="category__link purpleText">{category.categoryName}</li>
        </ul>
      ))}
    </div>
  );
};

export default CategoryNavbar;
