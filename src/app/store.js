import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import msAuthReducer from "../features/msAuth/msAuthSlice";
import msUsersReducer from "../features/msUser/msUsersSlice";
import msPPOBReducer from "../features/msPPOB/msPPOBSlice";

const rootReducer = combineReducers({
    auth: msAuthReducer,
    users: msUsersReducer,
    ppob: msPPOBReducer,
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