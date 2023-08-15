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

  // State to track the currently active category
  const [activeCategory, setActiveCategory] = React.useState<string | null>(
    null
  );

  return (
    <div className="categoryNavbar">
      {/* map all categories to display */}
      {catagories.map((category: Category) => (
        <ul
          // Apply 'active' class if the category is currently active
          className={`category ${
            category._id === activeCategory ? "active" : ""
          }`}
          key={category._id}
          onClick={() => {
            // If clicked category is already active, deactivate it
            if (activeCategory === category._id) {
              setActiveCategory(null);
              onSelectCategory("");
            } else {
              // Otherwise, activate the clicked category
              setActiveCategory(category._id);
              onSelectCategory(category._id);
            }
          }}
        >
          <li className="category__link purpleText">{category.categoryName}</li>
        </ul>
      ))}
    </div>
  );
};

export default CategoryNavbar;
