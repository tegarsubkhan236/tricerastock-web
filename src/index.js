import React from "react";
import ReactDOM from 'react-dom/client';
import App from './App';
import "antd/dist/reset.css"
import {Provider} from "react-redux";
import {persistor, store} from "./app/store";
import {injectStore} from "./app/injectStore";
import {PersistGate} from "redux-persist/integration/react";

injectStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);