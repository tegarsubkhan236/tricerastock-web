import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import msAuthReducer from "../features/core/coreAuth/coreAuthSlice";
import msUsersReducer from "../features/core/coreUser/coreUsersSlice";
import msSupplierReducer from "../features/master/msSupplier/msSupplierSlice";
import msProductCategoriesReducer from "../features/master/msProductCategory/msProductCategorySlice";
import msProductsReducer from "../features/master/msProduct/msProductSlice";
import trPurchaseOrdersReducer from "../features/transaction/trPurchaseOrder/trPurchaseOrderSlice";

const rootReducer = combineReducers({
    auth: msAuthReducer,
    users: msUsersReducer,
    suppliers: msSupplierReducer,
    productCategories: msProductCategoriesReducer,
    products: msProductsReducer,
    purchaseOrders: trPurchaseOrdersReducer
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