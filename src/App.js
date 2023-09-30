import React from 'react';
import "./assets/css/App.css"
import {router} from "./router";
import {RouterProvider} from "react-router-dom";
import {ConfigProvider} from "antd";
import {config} from './config/provider'

const App = () => {
    return (
        <ConfigProvider theme={config}>
            <RouterProvider router={router} />
        </ConfigProvider>
    );
};
export default App;