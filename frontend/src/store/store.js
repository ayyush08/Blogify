// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Setup persist configuration
const persistConfig = {
    key: 'auth', // key to store it in localStorage
    storage, // using localStorage
    whitelist: ['status', 'userData'], // only token will be persisted
};

// Wrap authReducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Configure the store
const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        // other reducers here if you have any
    },
});

export const persistor = persistStore(store);

export default store;
