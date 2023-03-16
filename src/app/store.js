import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/usersSlice";
import postsReducer from "../features/posts/postSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    posts: postsReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [
        thunk
    ]
})

const persistor = persistStore(store, null, () => {
    persistor.purge().then(() => console.log("Application ready to run"));
});

export { store, persistor };