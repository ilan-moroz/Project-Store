import React from "react";
import { useCategory } from "../../hooks/useCategory";
import { Category } from "../../models/Category";
import "./categoryNavbar.css";
import { useCategoryState } from "../../hooks/useCategoryState";
import {
  resetSelectedCategoryAction,
  setSelectedCategoryAction,
} from "../../redux/categoryReducer";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

type CategoryProps = {
  onSelectCategory: (Category: string) => void;
};

const CategoryNavbar: React.FC<CategoryProps> = ({ onSelectCategory }) => {
  // get all categories from a custom hook
  const catagories = useCategory();

  // State to track the currently active category
  const { selectedCategory } = useCategoryState();

  const dispatch = useDispatch();

  // handler for category selection
  const handleSelectCategory = (category: Category) => {
    // If clicked category is already active, deactivate it
    if (selectedCategory === category._id) {
      dispatch(resetSelectedCategoryAction());
      onSelectCategory("");
    } else {
      // Otherwise, activate the clicked category
      dispatch(setSelectedCategoryAction(category._id));
      onSelectCategory(category._id);
    }
  };

  const location = useLocation();

  // reset selected category when location changes
  React.useEffect(() => {
    dispatch(resetSelectedCategoryAction());
    onSelectCategory("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="categoryNavbar">
      {/* map all categories to display */}
      {catagories.map((category: Category) => (
        <ul
          // Apply 'active' class if the category is currently active
          className={`category ${
            category._id === selectedCategory ? "active" : ""
          }`}
          key={category._id}
          onClick={() => {
            handleSelectCategory(category);
          }}
        >
          <li className="category__link purpleText">{category.categoryName}</li>
        </ul>
      ))}
    </div>
  );
};

export default CategoryNavbar;
