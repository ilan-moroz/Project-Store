// Initial state
export interface CategoryState {
  selectedCategory: string | null;
}

// all possible action types
export enum CategoryActionType {
  setSelectedCategory = "setSelectedCategory",
  resetSelectedCategory = "resetSelectedCategory",
}

// Defining the action structure
export interface CategoryAction {
  type: CategoryActionType;
  payload?: any;
}

// Functions to dispatch actions

export const setSelectedCategoryAction = (
  categoryId: string
): CategoryAction => {
  return { type: CategoryActionType.setSelectedCategory, payload: categoryId };
};

export const resetSelectedCategoryAction = (): CategoryAction => {
  return { type: CategoryActionType.resetSelectedCategory };
};

// Reducer function to handle state changes based on actions
export const categoryReducer = (
  currentState: CategoryState = {
    selectedCategory: null,
  },
  action: CategoryAction
): CategoryState => {
  const newState = { ...currentState };

  switch (action.type) {
    case CategoryActionType.setSelectedCategory:
      newState.selectedCategory = action.payload;
      break;

    case CategoryActionType.resetSelectedCategory:
      newState.selectedCategory = null;
      break;
  }

  return newState;
};
