import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import { persistReducer ,persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// Some bundlers / environments may resolve `storage` incorrectly.
// Ensure we have an object with the storage API (getItem/setItem/removeItem).
let storageEngine = (storage && typeof storage.getItem === 'function')
  ? storage
  : (typeof window !== 'undefined' && window.localStorage ? window.localStorage : undefined);

// redux-persist expects the storage methods to return Promises. Wrap sync
// `localStorage` methods so they return Promises to avoid runtime errors.
const ensureAsyncStorage = (s) => {
  if (!s) return {
    getItem: () => Promise.resolve(null),
    setItem: () => Promise.resolve(),
    removeItem: () => Promise.resolve(),
  };

  return {
    getItem: (key) => {
      try {
        const res = s.getItem(key);
        return res && typeof res.then === 'function' ? res : Promise.resolve(res);
      } catch (err) {
        return Promise.reject(err);
      }
    },
    setItem: (key, value) => {
      try {
        const res = s.setItem(key, value);
        return res && typeof res.then === 'function' ? res : Promise.resolve(res);
      } catch (err) {
        return Promise.reject(err);
      }
    },
    removeItem: (key) => {
      try {
        const res = s.removeItem(key);
        return res && typeof res.then === 'function' ? res : Promise.resolve(res);
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }
}

storageEngine = ensureAsyncStorage(storageEngine);


const rootReducer =  combineReducers({user:userReducer});
const persistConfig = {
    key: 'root',
    version: 1,
    storage: storageEngine,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);