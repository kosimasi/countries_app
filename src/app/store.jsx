
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from '../features/theme/ThemeSlice';
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    theme: themeReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["theme"],
  blacklist: [],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    })
});
export const persistor = persistStore(store);
