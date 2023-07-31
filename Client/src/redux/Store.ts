import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./userReducer";

const userPersistConfig = {
  key: "user",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const reducers = {
  user: persistedUserReducer,
};

const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    thunk: true,
  }),
});

let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export { store, persistor };
