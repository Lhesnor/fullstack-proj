import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./tokenSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, tokenReducer);

export const store = configureStore({
  reducer: {
    token: persistedReducer,
  },
});

export const persistor = persistStore(store);
