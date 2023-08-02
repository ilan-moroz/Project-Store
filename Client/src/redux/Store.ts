import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./userReducer";

// This configuration allows the userReducer to be persisted in local storage
const userPersistConfig = {
  key: "user",
  storage,
};

// This configuration allows the userReducer to be persisted in local storage
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

// Combining all the reducers in the application
const reducers = {
  user: persistedUserReducer,
};

// Configuring the Redux store
const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    thunk: true,
  }),
});

// Creating a persistor using the store
let persistor = persistStore(store);

// Define a type for the whole state of the app
export type RootState = ReturnType<typeof store.getState>;

export { store, persistor };
