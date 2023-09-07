import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import authReducer from "../features/core/auth/authSlice";
import usersReducer from "../features/core/user/usersSlice";
import supplierReducer from "../features/master/supplier/supplierSlice";
import productCategoriesReducer from "../features/master/productCategory/productCategorySlice";
import productsReducer from "../features/master/product/productSlice";
import purchaseOrdersReducer from "../features/transaction/purchaseOrder/purchaseOrderSlice";
import receivingOrdersReducer from "../features/transaction/receivingOrder/receivingOrderSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    suppliers: supplierReducer,
    productCategories: productCategoriesReducer,
    products: productsReducer,
    purchaseOrders: purchaseOrdersReducer,
    receivingOrders: receivingOrdersReducer,
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