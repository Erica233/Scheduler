import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./slices/tableSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage,
};

// replace the value of the reducer property from tableReducer to persistedReducer
// enhaced reducer with configruation to persist the state to local storage
const persistedReducer = persistReducer(persistConfig, tableReducer);

export const store = configureStore(
    {
        reducer: persistedReducer,
        devTools: process.env.NODE_ENV !== 'production',
        middleware: [thunk]
    }
);

export const persistor = persistStore(store);