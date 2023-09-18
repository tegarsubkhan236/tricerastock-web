import React from "react";
import ReactDOM from 'react-dom/client';
import App from './App';
import "antd/dist/reset.css"
import "./assets/css/App.css"
import {Provider} from "react-redux";
import {persistor, store} from "./app/store";
import {PersistGate} from "redux-persist/integration/react";
import {injectStore} from "./config";

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