import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import msAuthReducer from "../features/coreAuth/coreAuthSlice";
import msUsersReducer from "../features/coreUser/coreUsersSlice";
import msInvSupplierReducer from "../features/invSupplier/invSupplierSlice";
import msInvProductCategoriesReducer from "../features/invProductCategory/invProductCategorySlice";
import msInvProductsReducer from "../features/invProduct/invProductSlice";
import msPPOBReducer from "../features/invPPOB/invPPOBSlice";

const rootReducer = combineReducers({
    auth: msAuthReducer,
    users: msUsersReducer,
    suppliers: msInvSupplierReducer,
    productCategories: msInvProductCategoriesReducer,
    products: msInvProductsReducer,
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

const persistor = persistStore(store, null, async () => {
    await persistor.purge()
});

export { store, persistor };