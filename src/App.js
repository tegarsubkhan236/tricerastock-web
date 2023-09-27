import React from 'react';
import "./assets/css/App.css"
import {router} from "./router";
import {RouterProvider} from "react-router-dom";

const App = () => {
    return (
        <RouterProvider router={router} />
    );
};
export default App;