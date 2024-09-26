// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import likesReducer from './likesSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
// Setup persist configuration
const persistConfig = {
    key: 'root', // key to store it in localStorage
    storage, // using localStorage
    whitelist: ['status', 'userData'], // only token will be persisted
};

// Wrap authReducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedLikesReducer = persistReducer(persistConfig, likesReducer);
// Configure the store
const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        likes: persistedLikesReducer,
        // other reducers here if you have any

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export default store;
